import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import SiteFooter from '../components/SiteFooter.jsx'

const bathImages = [
  '/images/projects/project-01.jpg',
  '/images/projects/project-04.jpg',
  '/images/projects/project-06.jpg',
  '/images/portfolio/portfolio/portfolio-01.jpg',
  '/images/portfolio/portfolio/portfolio-03.jpg',
  '/assets/content/our-works-1.jpg',
]

const advantages = [
  'Работаем по всему Казахстану',
  'Гарантия качества',
  'Собственное производство',
  'Индивидуальные проекты',
]

const stats = [
  ['6+', 'лет опыта'],
  ['120+', 'построенных объектов'],
  ['40+', 'готовых проектов'],
  ['100%', 'сопровождение клиента'],
]

const steps = [
  ['01', 'Консультация', 'Обсуждаем задачу, участок, материалы, бюджет и желаемые сроки.'],
  ['02', 'Проектирование', 'Подбираем готовый проект или разрабатываем индивидуальное решение.'],
  ['03', 'Строительство', 'Организуем поставку материалов и ведем строительство под ключ.'],
  ['04', 'Сдача объекта', 'Проверяем качество, передаем объект и рекомендации по эксплуатации.'],
]

export default function AboutPage() {
  const { setModalOpen } = useApp()

  return (
    <>
      <section className="about-hero">
        <div className="about-hero__content">
          <p>BANI.KZ</p>
          <h1>СТРОИМ БАНИ И САУНЫ<br/>ПОД КЛЮЧ<br/>ПО ВСЕМУ КАЗАХСТАНУ</h1>
          <span>Создаем современные деревянные бани, которые служат десятилетиями.</span>
          <div className="about-hero__actions">
            <button type="button" onClick={() => setModalOpen(true)}>ОСТАВИТЬ ЗАЯВКУ</button>
            <Link to="/catalog">СМОТРЕТЬ ПРОЕКТЫ</Link>
          </div>
        </div>
        <div className="about-hero__image">
          <img src="/images/projects/project-01.jpg" alt="Деревянная баня BANI.KZ" />
        </div>
      </section>

      <section className="about-section about-intro">
        <div className="about-intro__image">
          <img src="/images/portfolio/portfolio/portfolio-02.jpg" alt="Строительство бани" />
        </div>
        <div className="about-intro__content">
          <h2>О КОМПАНИИ</h2>
          <p>Мы занимаемся проектированием и строительством бань и саун под ключ по всему Казахстану. Работаем с брусом, бревном и современными каркасными технологиями.</p>
          <p>Наша команда сопровождает клиента от идеи и проекта до полной реализации.</p>
          <div className="about-advantages">
            {advantages.map((item) => <article key={item}>{item}</article>)}
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="about-stats__inner">
          {stats.map(([value, label]) => (
            <article key={label}>
              <b>{value}</b>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section about-steps">
        <h2>КАК МЫ РАБОТАЕМ</h2>
        <div className="about-steps__grid">
          {steps.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section about-gallery">
        <div className="about-gallery__grid">
          {bathImages.map((image, index) => (
            <img className={index < 2 ? 'large' : ''} src={image} alt="Проект бани" key={image} />
          ))}
        </div>
      </section>

      <section className="about-section about-cta">
        <div>
          <h2>ГОТОВЫ ОБСУДИТЬ ВАШ ПРОЕКТ?</h2>
          <p>Оставьте заявку и мы подготовим предварительный расчет стоимости.</p>
        </div>
        <button type="button" onClick={() => setModalOpen(true)}>ОСТАВИТЬ ЗАЯВКУ</button>
      </section>

      <SiteFooter />
    </>
  )
}
