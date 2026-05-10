import { Link, useParams } from 'react-router-dom'
import { services } from '../data/services.js'
import { useApp } from '../context/AppContext.jsx'

export default function ServiceDetail() {
  const { id } = useParams()
  const { setModalOpen } = useApp()
  const service = services.find((item) => item.id === id)

  if (!service) {
    return (
      <section className="section">
        <h1>Услуга не найдена</h1>
        <Link to="/services">Назад</Link>
      </section>
    )
  }

  return (
    <section className="detail">
      <img src={service.image} alt={service.title} />
      <div>
        <span className="badge">{service.tag}</span>
        <h1>{service.title}</h1>
        <p>{service.text}</p>
        <ul>
          <li>Индивидуальная планировка</li>
          <li>Премиальная отделка</li>
          <li>Понятные этапы строительства</li>
        </ul>
        <h2>{service.price.toLocaleString('ru-RU')} ₸</h2>
        <button className="primary" onClick={() => setModalOpen(true)}>Оставить заявку</button>
      </div>
    </section>
  )
}
