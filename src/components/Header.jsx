import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { FaDownload, FaMoon, FaSignInAlt, FaSun, FaTelegramPlane, FaUserCircle, FaWhatsapp } from 'react-icons/fa'
import { useApp } from '../context/AppContext.jsx'

export default function Header() {
  const { dark, setDark, setModalOpen, isAuthenticated, user } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const scrollToCatalogDownload = () => {
    const scroll = () => document.getElementById('catalog-download')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

    if (isHome) {
      scroll()
      return
    }

    navigate('/')
    window.setTimeout(scroll, 120)
  }
  const links = [
    ['/portfolio', 'ПОРТФОЛИО'],
    ['/catalog', 'КАТАЛОГ'],
    ['/calculator', 'КАЛЬКУЛЯТОР'],
    ['/about', 'О КОМПАНИИ'],
    ['/contacts', 'КОНТАКТЫ'],
  ]

  return (
    <header className={classNames('top-header', { 'top-header--home': isHome })}>
      <div className="header-info">
        <div className="hero-inner header-inner">
        <NavLink className="brand" to="/">BANI.KZ</NavLink>
        <div className="place"><span>📍</span><b>Строим по всему Казахстану</b><br/></div>
        <button className="catalog-download" onClick={scrollToCatalogDownload}><FaDownload aria-hidden="true" /> СКАЧАТЬ КАТАЛОГ С ЦЕНАМИ</button>
        <div className="online"><span>• Пишите, мы онлайн</span><div className="social-links"><a className="social-link social-link--whatsapp" href="https://wa.me/77053192643" aria-label="WhatsApp"><FaWhatsapp /></a><a className="social-link social-link--telegram" href="https://t.me/" aria-label="Telegram"><FaTelegramPlane /></a></div></div>
        <div className="phone"><small>Звоните Пн-Пт: 9:00 - 18:00</small><b>+7 705 319 26 43</b><button onClick={() => setModalOpen(true)}>Заказать консультацию</button></div>
        </div>
      </div>
      <nav className="main-nav">
        <div className="hero-inner nav-inner">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => classNames('main-nav__link', { active: isActive })}>{label}</NavLink>
          ))}
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setDark(!dark)}
            aria-label={dark ? 'Включить светлую тему' : 'Включить темную тему'}
            title={dark ? 'Светлая тема' : 'Темная тема'}
          >
            {dark ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
          </button>
          <NavLink className="auth-nav-link" to={isAuthenticated ? '/profile' : '/login'}>
            {isAuthenticated ? <FaUserCircle aria-hidden="true" /> : <FaSignInAlt aria-hidden="true" />}
            <span>{isAuthenticated ? (user?.name || 'Профиль') : 'Войти'}</span>
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
