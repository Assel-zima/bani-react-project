import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

export default function ServiceCard({ service }) {
  const { favorites, toggleFavorite } = useApp()
  return <article className="card">
    <img src={service.image} alt={service.title} />
    <div className="card__body">
      <span className="badge">{service.tag}</span>
      <h3>{service.title}</h3><p>{service.text}</p>
      <strong>{service.price.toLocaleString('ru-RU')} ₸</strong>
      <div className="card__actions"><Link className="primary" to={`/services/${service.id}`}>Подробнее</Link><button className="ghost" onClick={() => toggleFavorite(service.id)}>{favorites.includes(service.id) ? '★' : '☆'}</button></div>
    </div>
  </article>
}
