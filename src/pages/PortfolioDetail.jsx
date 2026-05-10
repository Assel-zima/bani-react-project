import { Link, useParams } from 'react-router-dom'

export default function PortfolioDetail(){
  const { id = 'banya-1' } = useParams()
  const number = id.replace('banya-', '')
  const image = `/images/portfolio/portfolio-${String(number).padStart(2, '0')}.jpg`

  return (
    <section className="section detail">
      <div>
        <h1>Баня 12x6. Финская</h1>
        <p>Краткая страница проекта из портфолио.</p>
        <Link className="primary" to="/#portfolio-block">Назад в портфолио</Link>
      </div>
      <img src={image} alt="Баня 12x6. Финская" />
    </section>
  )
}
