import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../api/api.js'
import Loader from '../components/Loader.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProductById(id).then(setProduct).finally(() => setLoading(false))
  }, [id])

  if (loading) return <Loader />
  if (!product) return <section className="section"><h1>Товар не найден</h1></section>

  return (
    <section className="detail">
      <img src={product.thumbnail} alt={product.title} />
      <div>
        <p className="eyebrow">Динамическая страница useParams</p>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <h2>${product.price}</h2>
        <Link className="ghost" to="/catalog">Назад в каталог</Link>
      </div>
    </section>
  )
}
