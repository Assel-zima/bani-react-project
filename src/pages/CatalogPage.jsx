import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter.jsx'

const catalogProjects = [
  ['Баня из бруса 6x6 проект ПК-1', 'project-01.jpg', '850 000 ₸', 850000, 3, 1, 36],
  ['Баня барнхаус 6x6 проект ПК-1', 'project-02.png', '900 000 ₸', 900000, 3, 1, 42],
  ['Баня дрейм 6x6 проект ПК-1', 'project-03.png', '600 000 ₸', 600000, 3, 1, 36],
  ['Баня сканди 8x6 проект ПК-1', 'project-04.jpg', '500 000 ₸', 500000, 4, 1, 56],
  ['Баня бочка 6x6 проект ПК-1', 'project-05.png', '850 000 ₸', 850000, 3, 1, 36],
  ['Баня 6x6 проект ПК-1', 'project-06.jpg', '900 000 ₸', 900000, 4, 2, 42],
  ['Баня сканди 6x6 проект ПК-1', 'project-07.jpg', '600 000 ₸', 600000, 3, 1, 36],
  ['Баня из сруба 6x6 проект ПК-1', 'project-08.jpg', '500 000 ₸', 500000, 4, 2, 56],
]

const initialFilters = {
  rooms: [],
  area: [],
  floors: [],
}

const sortOptions = [
  ['default', 'По умолчанию'],
  ['price-asc', 'С меньшей цены'],
  ['price-desc', 'С большей цены'],
  ['name-asc', 'По названию (А—Я)'],
  ['name-desc', 'По названию (Я—А)'],
]

const getProjectWhatsappUrl = (title, price) => {
  const text = `Здравствуйте! Интересует проект: ${title}. Стоимость: ${price}. Хочу получить консультацию.`
  return `https://wa.me/77053192643?text=${encodeURIComponent(text)}`
}

export default function CatalogPage() {
  const [draftFilters, setDraftFilters] = useState(initialFilters)
  const [activeFilters, setActiveFilters] = useState(initialFilters)
  const [sortBy, setSortBy] = useState('default')
  const [page, setPage] = useState(1)

  const toggleFilter = (group, value) => {
    setDraftFilters((filters) => {
      const values = filters[group]
      return {
        ...filters,
        [group]: values.includes(value) ? values.filter((item) => item !== value) : [...values, value],
      }
    })
  }

  const resetFilters = () => {
    setDraftFilters(initialFilters)
    setActiveFilters(initialFilters)
    setPage(1)
  }

  const projects = useMemo(() => {
    const filtered = catalogProjects.filter((project) => {
      const [, , , , rooms, floors, area] = project
      const matchesRooms = activeFilters.rooms.length === 0 || activeFilters.rooms.includes(rooms)
      const matchesArea = activeFilters.area.length === 0 || activeFilters.area.includes(area)
      const matchesFloors = activeFilters.floors.length === 0 || activeFilters.floors.includes(floors)
      return matchesRooms && matchesArea && matchesFloors
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === 'price-asc') return a[3] - b[3]
      if (sortBy === 'price-desc') return b[3] - a[3]
      if (sortBy === 'name-asc') return a[0].localeCompare(b[0], 'ru')
      if (sortBy === 'name-desc') return b[0].localeCompare(a[0], 'ru')
      return catalogProjects.indexOf(a) - catalogProjects.indexOf(b)
    })
  }, [activeFilters, sortBy])
  const pageCount = Math.max(1, Math.ceil(projects.length / 6))
  const visibleProjects = projects.slice((page - 1) * 6, page * 6)
  const applyFilters = () => {
    setActiveFilters(draftFilters)
    setPage(1)
  }

  return (
    <>
    <section className="catalog-page">
      <div className="catalog-page__inner">
        <nav className="catalog-breadcrumbs" aria-label="Хлебные крошки">
          <Link to="/">Главная</Link>
          <span>|</span>
          <Link to="/catalog">Каталог</Link>
          <span>|</span>
          <b>Весь каталог</b>
        </nav>

        <h1>КАТАЛОГ</h1>

        <div className="catalog-sort">
          <span>Сортировать:</span>
          {sortOptions.map(([value, label]) => (
            <button className={sortBy === value ? 'active' : ''} type="button" key={value} onClick={() => { setSortBy(value); setPage(1) }}>
              {label}
            </button>
          ))}
        </div>

        <div className="catalog-layout">
          <aside className="catalog-filter">
            <h2>Фильтр по каталогу</h2>
            <CatalogFilterGroup title="Комнат:" group="rooms" values={[3, 4]} selected={draftFilters.rooms} onToggle={toggleFilter} />
            <CatalogFilterGroup title="Площадь:" group="area" values={[36, 42, 56]} suffix=" м2" selected={draftFilters.area} onToggle={toggleFilter} />
            <CatalogFilterGroup title="Этажность:" group="floors" values={[1, 2]} selected={draftFilters.floors} onToggle={toggleFilter} />
            <button className="catalog-filter__apply" type="button" onClick={applyFilters}>Подобрать</button>
            <button className="catalog-filter__reset" type="button" onClick={resetFilters}>Сбросить фильтры</button>
          </aside>

          <div className="catalog-results">
            <div className="catalog-project-grid">
              {visibleProjects.map(([title, img, price, , rooms, floors, area]) => (
                <article className="project-card catalog-card" key={title}>
                  <div className="hit">✓ Хит</div>
                  <img src={`/images/projects/${img}`} alt={title} />
                  <h3>{title}</h3>
                  <ul>
                    <li>Комнат: {rooms}</li>
                    <li>Этажность: {floors}</li>
                    <li>Размер: 6x6</li>
                    <li>Площадь: {area} м2</li>
                    <li>Срок: 10 дней</li>
                  </ul>
                  <div className="price"><span>Стоимость под ключ:</span><b>{price}</b></div>
                  <a href={getProjectWhatsappUrl(title, price)} target="_blank" rel="noreferrer">ПЕРЕЙТИ</a>
                </article>
              ))}
            </div>
            {projects.length === 0 && <p className="catalog-empty">По выбранным параметрам проектов не найдено.</p>}
            {pageCount > 1 && (
              <div className="catalog-pagination" aria-label="Страницы каталога">
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                  <button className={page === pageNumber ? 'active' : ''} type="button" key={pageNumber} onClick={() => setPage(pageNumber)}>
                    {pageNumber}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
    <SiteFooter />
    </>
  )
}

function CatalogFilterGroup({ title, group, values, suffix = '', selected, onToggle }) {
  return (
    <div className="catalog-filter__group">
      <h3>{title}</h3>
      {values.map((value) => (
        <label key={value}>
          <input type="checkbox" checked={selected.includes(value)} onChange={() => onToggle(group, value)} />
          <span>{value}{suffix}</span>
        </label>
      ))}
    </div>
  )
}
