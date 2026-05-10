import { useEffect, useState } from 'react'
import { getProducts } from '../api/api.js'
import Loader from '../components/Loader.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function Catalog() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getProducts(8)
      .then((data) => setProducts(data.products))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="section page">
      <div className="section__head">
        <p className="eyebrow">API каталог</p>
        <h1>Материалы и товары</h1>
        <p>Данные загружаются через fetch с DummyJSON.</p>
      </div>
      {loading && <Loader />}
      {error && <p className="error">{error}</p>}
      <div className="products">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
    </section>
  )
}
