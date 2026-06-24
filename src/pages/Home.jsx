import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaClock, FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaTelegramPlane, FaViber, FaVk, FaWhatsapp } from 'react-icons/fa'
import { useApp } from '../context/AppContext.jsx'
import CalculatorBlock from '../components/CalculatorBlock.jsx'

const A = '/assets/content/'
const yandexMapUrl = 'https://yandex.kz/maps/org/nurly_orda/72255833797/?ll=71.408858%2C51.139051&mode=search&sll=71.408858%2C51.139051&sspn=0.035534%2C0.014781&text=%D1%83%D0%BB.%20%D0%9A%D0%B0%D0%B1%D0%B0%D0%BD%D0%B1%D0%B0%D0%B9%20%D0%B1%D0%B0%D1%82%D1%8B%D1%80%D0%B0%2C%2010%D0%90%20%D0%BE%D1%80%D0%B8%D0%B5%D0%BD%D1%82%D0%B8%D1%80%20%E2%80%94%20%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81-%D1%86%D0%B5%D0%BD%D1%82%D1%80&z=16'
const yandexMapWidgetUrl = 'https://yandex.kz/map-widget/v1/?ll=71.408858%2C51.139051&mode=search&oid=72255833797&ol=biz&z=16'
const categories = [
  ['БАНИ ИЗ БРЕВНА', 'bani-iz-brevna.png'], ['БАНИ ИЗ БРУСА', 'bani-iz-brusa.png'], ['КАРКАСНЫЕ БАНИ', 'karkasnye-bani.png'], ['БАНИ ИЗ БЛОКОВ', 'bani-iz-blokov.png'],
  ['ДОМА-БАНИ', 'doma-bani.png'], ['МОБИЛЬНЫЕ БАНИ', 'mobilnye-bani.png'], ['БАНИ-БОЧКИ', 'bani-bochki.png'], ['БАНЯ БАРНХАУС', 'banya-barnhaus.png'],
]
const works = ['portfolio-01.jpg','portfolio-02.jpg','portfolio-03.jpg','portfolio-04.jpg','portfolio-05.jpg','portfolio-06.jpg']
const projects = [
  ['Баня из бруса 6x6 проект ПК-1','project-01.jpg','850 000 ₸'], ['Баня барнхаус 6x6 проект ПК-1','project-02.png','900 000 ₸'], ['Баня дрейм 6x6 проект ПК-1','project-03.png','600 000 ₸'], ['Баня сканди 8x6 проект ПК-1','project-04.jpg','500 000 ₸'],
  ['Баня бочка 6x6 проект ПК-1','project-05.png','850 000 ₸'], ['Баня 6x6 проект ПК-1','project-06.jpg','900 000 ₸'], ['Баня сканди 6x6 проект ПК-1','project-07.jpg','600 000 ₸'], ['Баня из сруба 6x6 проект ПК-1','project-08.jpg','500 000 ₸'],
]

export default function Home(){
  const { setModalOpen } = useApp()
  const [catalogContactMethod, setCatalogContactMethod] = useState('whatsapp')
  const [catalogPhone, setCatalogPhone] = useState('')
  const [catalogPhoneError, setCatalogPhoneError] = useState('')
  const handleCatalogSubmit = () => {
    if (catalogPhone.replace(/\D/g, '').length < 10) {
      setCatalogPhoneError('Введите номер телефона')
      return
    }
    setCatalogPhoneError('')
    const text = encodeURIComponent(`от сайта .alphaedu.tech\nЗдравствуйте! Хочу получить полный каталог бань с ценами.\nТелефон: ${catalogPhone || 'не указан'}`)
    const link = catalogContactMethod === 'telegram' ? `https://t.me/your_telegram_username?text=${text}` : `https://wa.me/77053192643?text=${text}`
    window.open(link, '_blank')
  }
  return <>
    <section className="hero-original" id="top">
      <div className="hero-inner">
        <div className="hero-text">
        <h1>СТРОИТЕЛЬСТВО<br/>БАНЬ И САУН</h1>
        <div className="signature">под ключ</div>
        <div className="hero-description">
          <p><span className="hero-dot" />От идеи - до первой топки всего за 20 дней.</p>
          <p><span className="hero-dot" />Только деревянные бани (брус / бревно)</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="big-yellow hero-cta">ОСТАВИТЬ ЗАЯВКУ<br/><span>на расчет стоимости</span></button>
        </div>
      </div>
    </section>

    <div className="hero-ticker" aria-hidden="true">
      <div className="hero-ticker__track">
        <span>СТРОИТЕЛЬСТВО БАНЬ И САУН</span>
        <span className="hero-ticker__dot">●</span>
        <span>ОТ ИДЕИ ДО ПЕРВОЙ ТОПКИ ВСЕГО ЗА 20 ДНЕЙ</span>
        <span className="hero-ticker__dot">●</span>
        <span>ТОЛЬКО ДЕРЕВЯННЫЕ БАНИ (БРУС / БРЕВНО)</span>
        <span className="hero-ticker__dot">●</span>
        <span>СТРОИТЕЛЬСТВО БАНЬ И САУН</span>
        <span className="hero-ticker__dot">●</span>
        <span>ОТ ИДЕИ ДО ПЕРВОЙ ТОПКИ ВСЕГО ЗА 20 ДНЕЙ</span>
        <span className="hero-ticker__dot">●</span>
        <span>ТОЛЬКО ДЕРЕВЯННЫЕ БАНИ (БРУС / БРЕВНО)</span>
        <span className="hero-ticker__dot">●</span>
      </div>
    </div>

    <section className="white-section" id="catalog-block"><div className="section-container">
      <h2>У НАС НЕТ ОГРАНИЧЕНИЙ. ВОПЛОТИМ ЛЮБУЮ ВАШУ<br/>ИДЕЮ ИЗ ЛЮБОГО МАТЕРИАЛА</h2>
      <div className="category-grid">{categories.map(([title,img])=><article className="category-card" key={title}><img src={`/images/categories/${img}`}/><h3>{title}</h3></article>)}</div>
    </div></section>

    <CalculatorBlock />

    <section className="white-section projects-block"><div className="section-container">
      <h2>ПОСТРОИМ БАНЮ ПО ГОТОВОМУ ПРОЕКТУ ИЛИ<br/>РАЗРАБОТАЕМ ПОД ВАС ИНДИВИДУАЛЬНЫЙ</h2><p className="muted">ТОП-12 лучших проектов за 2024 год</p>
      <div className="project-grid">{projects.map(([title,img,price])=><article className="project-card" key={title}><div className="hit">✓ Хит</div><img src={`/images/projects/${img}`}/><h3>{title}</h3><ul><li>Комнат: 3</li><li>Этажность: 1</li><li>Размер: 6x6</li><li>Площадь: 36 м2</li><li>Срок: 10 дней</li></ul><div className="price"><span>Стоимость под ключ:</span><b>{price}</b></div><Link to="/catalog">ПЕРЕЙТИ</Link></article>)}</div>
    </div></section>

    <section className="download-block" id="catalog-download">
      <div className="download-block__content">
        <h2>ЭТО НЕ ВЕСЬ КАТАЛОГ.<br/>СКАЧАЙТЕ ПОЛНЫЙ КАТАЛОГ<br/>БАНЬ С ЦЕНАМИ В <em>1 клик</em></h2>
        <p>Выберите куда вам удобнее отправить?</p>
        <div className="form-line"><select value={catalogContactMethod} onChange={(event) => setCatalogContactMethod(event.target.value)}><option value="whatsapp">Получить в WhatsApp</option><option value="telegram">Получить в Telegram</option></select><div className="catalog-phone-field"><input type="tel" className={catalogPhoneError ? 'is-invalid' : ''} value={catalogPhone} onChange={(event) => { setCatalogPhone(event.target.value); setCatalogPhoneError('') }} placeholder="Ваш номер телефона"/>{catalogPhoneError && <span>{catalogPhoneError}</span>}</div><button type="button" onClick={handleCatalogSubmit}>ПОЛУЧИТЬ ПРАЙС-ЛИСТ</button></div>
        <small><span className="download-block__check">✓</span> Согласен с условиями политики конфиденциальности данных</small>
      </div>
      <img
  className="download-block__booklet catalog-book"
  src="/images/catalog/catalog.png"
  alt="Каталог бань"
/>
    </section>

    <section className="white-section portfolio-block" id="portfolio-block"><div className="section-container">
      <h2>В 2026 ГОДУ ПОСТРОИЛИ 6 БАНЬ</h2><p className="muted">Посмотрите наши лучшие работы</p>
      <div className="works-grid">{works.map((img)=><article className="work-card" key={img}><img src={`/images/portfolio/portfolio/${img}`}/><div className="thumbs"><img src={A+'contacts-1.jpg'}/><img src={A+'contacts-2.jpg'}/><img src={A+'contacts-3.jpg'}/><img src={A+'contacts-4.jpg'}/></div><h3>БАНЯ 12X6. ФИНСКАЯ</h3><p>Описание работы - цена - сроки - место выполнения. Можно добавить отзыв клиента или видеообзор.</p><Link to="/portfolio">СМОТРЕТЬ ПОДРОБНЕЕ</Link></article>)}</div>
      <Link className="wide-yellow" to="/portfolio">ПЕРЕЙТИ В ПОРТФОЛИО</Link>
    </div></section>

    <footer className="site-footer">
      <div className="site-footer__contacts section-container">
        <div className="site-footer__info">
          <h2>НАШИ КОНТАКТЫ</h2>
          <ul className="site-footer__list">
            <li><span><FaMapMarkerAlt /></span><p className="site-footer__address"><span>г. Астана, просп. Кабанбай батыра 11/5</span><span>Нұрлы Орда Бизнес - центр</span></p></li>
            <li><span><FaClock /></span><p>Пн-Пт: 9:00 - 18:00<br/>Сб-Вс - выходные</p></li>
            <li><span><FaPhoneAlt /></span><p><b>+7 705 319 26 43</b></p></li>
            <li><span><FaEnvelope /></span><p>sss@gmail.com</p></li>
          </ul>
          <p className="site-footer__label">Пишите, мы онлайн</p>
          <div className="site-footer__socials">
            <a href="https://wa.me/77053192643" target="_blank" rel="noreferrer" aria-label="Viber"><FaViber /></a>
            <a href="https://wa.me/77053192643" target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
            <a href="https://t.me/your_telegram_username" target="_blank" rel="noreferrer" aria-label="Telegram"><FaTelegramPlane /></a>
          </div>
          <p className="site-footer__label">Мы в соцсетях</p>
          <div className="site-footer__socials site-footer__socials--media">
            <a href="#top" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#top" aria-label="Instagram"><FaInstagram /></a>
            <a href="#top" aria-label="VK"><FaVk /></a>
          </div>
          <a className="site-footer__requisites" href="#top">Реквизиты для юр. лиц</a>
        </div>

        <div className="site-footer__meetings">
          <div className="site-footer__photo-block">
            <h3>До встречи в офисе</h3>
            <div className="site-footer__photo-grid">
              <img className="site-footer__photo-main" src={A+'contacts-1.jpg'} alt="Офис компании" />
              <img src={A+'contacts-2.jpg'} alt="Переговорная" />
              <img src={A+'contacts-3.jpg'} alt="Рабочая зона" />
            </div>
          </div>
          <div className="site-footer__photo-block">
            <h3>До встречи у вас на замере</h3>
            <div className="site-footer__photo-grid">
              <img className="site-footer__photo-main" src={A+'contacts-4.jpg'} alt="Замер участка" />
              <img src={A+'our-works-1.jpg'} alt="Участок" />
              <img src={A+'work-steps-3.png'} alt="Замерщик" />
            </div>
          </div>
        </div>

        <div className="site-footer__map-wrap">
          <div className="site-footer__map-head">
            <h3>Адреса офиса:</h3>
            <a href={yandexMapUrl} target="_blank" rel="noreferrer">Посмотреть схемы перехода</a>
          </div>
          <div className="site-footer__map">
            <iframe src={yandexMapWidgetUrl} title="Карта офиса Нұрлы Орда" loading="lazy" allowFullScreen></iframe>
            <a className="site-footer__open-map" href={yandexMapUrl} target="_blank" rel="noreferrer">Открыть в Яндекс Картах</a>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="section-container site-footer__bottom-inner">
          <span>Все права защищены</span>
          <a href="#top">Политика конфиденциальности</a>
          <span>Сделано с любовью<br/><a href="#top">@@@</a></span>
        </div>
      </div>
    </footer>

  </>
}
