import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getProductById, getProducts, getUsers } from '../api/api.js'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('bani-theme') === 'dark')
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('bani-favorites') || '[]'))
  const [modalOpen, setModalOpen] = useState(false)
  const [serverData, setServerData] = useState({ products: [], featuredProduct: null, users: [] })
  const [serverReady, setServerReady] = useState(false)

  useEffect(() => {
    localStorage.setItem('bani-theme', dark ? 'dark' : 'light')
    document.body.className = dark ? 'dark' : ''
  }, [dark])

  useEffect(() => {
    localStorage.setItem('bani-favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    let mounted = true

    async function loadServerData() {
      const [productsResult, productResult, usersResult] = await Promise.allSettled([
        getProducts(6),
        getProductById(1),
        getUsers(3),
      ])

      if (!mounted) return

      setServerData({
        products: productsResult.status === 'fulfilled' ? productsResult.value.products || [] : [],
        featuredProduct: productResult.status === 'fulfilled' ? productResult.value : null,
        users: usersResult.status === 'fulfilled' ? usersResult.value.users || [] : [],
      })
      setServerReady(true)
    }

    loadServerData()

    return () => {
      mounted = false
    }
  }, [])

  function toggleFavorite(id) {
    setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])
  }

  const value = useMemo(
    () => ({ dark, setDark, favorites, toggleFavorite, modalOpen, setModalOpen, serverData, serverReady }),
    [dark, favorites, modalOpen, serverData, serverReady],
  )
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  return useContext(AppContext)
}
