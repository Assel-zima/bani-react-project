import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getCurrentUser, getProductById, getProducts, getUsers, loginUser, registerUser } from '../api/api.js'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('bani-theme') === 'dark')
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('bani-favorites') || '[]'))
  const [modalOpen, setModalOpen] = useState(false)
  const [serverData, setServerData] = useState({ products: [], featuredProduct: null, users: [] })
  const [serverReady, setServerReady] = useState(false)
  const [auth, setAuth] = useState(() => ({
    user: JSON.parse(localStorage.getItem('bani-user') || 'null'),
    token: localStorage.getItem('bani-token') || '',
  }))

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

  useEffect(() => {
    if (!auth.token) return

    let mounted = true

    getCurrentUser()
      .then((user) => {
        if (!mounted) return
        setAuth((current) => ({ ...current, user }))
        localStorage.setItem('bani-user', JSON.stringify(user))
      })
      .catch(() => {
        if (!mounted) return
        logout()
      })

    return () => {
      mounted = false
    }
  }, [auth.token])

  function toggleFavorite(id) {
    setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])
  }

  async function login(credentials) {
    const data = await loginUser(credentials)
    localStorage.setItem('bani-token', data.token)
    localStorage.setItem('bani-user', JSON.stringify(data.user))
    setAuth({ user: data.user, token: data.token })
    return data.user
  }

  async function register(payload) {
    const data = await registerUser(payload)
    localStorage.setItem('bani-token', data.token)
    localStorage.setItem('bani-user', JSON.stringify(data.user))
    setAuth({ user: data.user, token: data.token })
    return data.user
  }

  function logout() {
    localStorage.removeItem('bani-token')
    localStorage.removeItem('bani-user')
    setAuth({ user: null, token: '' })
  }

  const value = useMemo(
    () => ({
      dark,
      setDark,
      favorites,
      toggleFavorite,
      modalOpen,
      setModalOpen,
      serverData,
      serverReady,
      user: auth.user,
      token: auth.token,
      isAuthenticated: Boolean(auth.token && auth.user),
      login,
      register,
      logout,
    }),
    [dark, favorites, modalOpen, serverData, serverReady, auth],
  )
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  return useContext(AppContext)
}
