import { useState } from 'react'
import { services } from '../data/services.js'
import ServiceCard from '../components/ServiceCard.jsx'

export default function Services() {
  const [query, setQuery] = useState('')
  const filtered = services.filter((service) => service.title.toLowerCase().includes(query.toLowerCase()))

  return (
    <section className="page section">
      <div className="section__head">
        <p className="eyebrow">Услуги</p>
        <h1>Каталог бань</h1>
        <input
          className="search"
          placeholder="Поиск по услугам..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="grid">{filtered.map((service) => <ServiceCard key={service.id} service={service} />)}</div>
    </section>
  )
}
