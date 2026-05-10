import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <article className="product">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.brand || 'Материалы для бани'}</p>
      <b>${product.price}</b>
      <Link to={`/catalog/${product.id}`}>Открыть</Link>
    </article>
  )
}
