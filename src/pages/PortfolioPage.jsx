import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter.jsx'

const A = '/assets/content/'
const portfolioWorks = [
  ['Каркасные бани', 'portfolio-01.jpg'],
  ['Бани из бревна', 'portfolio-02.jpg'],
  ['Бани из бруса', 'portfolio-03.jpg'],
  ['Бани из бруса', 'portfolio-04.jpg'],
  ['Каркасные бани', 'portfolio-05.jpg'],
  ['Бани из бревна', 'portfolio-06.jpg'],
  ['Бани-бочки', 'project-05.png'],
  ['Бани из бруса', 'project-06.jpg'],
  ['Бани из бревна', 'project-08.jpg'],
]
const filters = ['Все', 'Каркасные бани', 'Бани-бочки', 'Бани из бруса', 'Бани из бревна']
const thumbs = ['contacts-1.jpg', 'contacts-2.jpg', 'contacts-3.jpg', 'contacts-4.jpg']
const getPortfolioWhatsappUrl = (category) => {
  const text = `Здравствуйте! Хочу узнать подробнее о работе из портфолио: ${category}.`
  return `https://wa.me/77053192643?text=${encodeURIComponent(text)}`
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('Все')
  const works = useMemo(() => activeFilter === 'Все' ? portfolioWorks : portfolioWorks.filter(([category]) => category === activeFilter), [activeFilter])

  return (
    <>
      <section className="portfolio-page">
        <div className="portfolio-page__inner">
          <nav className="portfolio-breadcrumbs" aria-label="Хлебные крошки">
            <Link to="/">Главная</Link>
            <span>|</span>
            <Link to="/portfolio">Портфолио</Link>
            <span>|</span>
            <b>Все работы</b>
          </nav>

          <h1>ПОРТФОЛИО</h1>

          <div className="portfolio-filters">
            {filters.map((filter) => (
              <button className={activeFilter === filter ? 'active' : ''} type="button" key={filter} onClick={() => setActiveFilter(filter)}>
                {filter}
              </button>
            ))}
          </div>

          <div className="portfolio-page__grid">
            {works.map(([category, image], index) => (
              <article className="portfolio-work-card" key={`${image}-${index}`}>
                <div className="portfolio-work-card__image">
                  <img src={image.startsWith('portfolio') ? `/images/portfolio/portfolio/${image}` : `/images/projects/${image}`} alt={category} />
                  <span aria-hidden="true">▶</span>
                </div>
                <div className="portfolio-work-card__thumbs">
                  {thumbs.map((thumb) => <img src={A + thumb} alt="" key={thumb} />)}
                </div>
                <h2>БАНЯ 12X6. ФИНСКАЯ</h2>
                <p>Описание работы - цена - сроки - место выполнения. Можно добавить отзыв клиента или видеообзор сюда же</p>
                <a href={getPortfolioWhatsappUrl(category)} target="_blank" rel="noreferrer">СМОТРЕТЬ ПОДРОБНЕЕ</a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  )
}
