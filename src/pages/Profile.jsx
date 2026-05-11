import { Navigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

export default function Profile() {
  const { isAuthenticated, logout, user } = useApp()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return (
    <section className="profile-page">
      <div className="profile-card">
        <p className="profile-card__eyebrow">Защищенная страница</p>
        <h1>Профиль</h1>
        <div className="profile-card__grid">
          <article>
            <span>Имя</span>
            <b>{user?.name || 'Пользователь'}</b>
          </article>
          <article>
            <span>Email</span>
            <b>{user?.email}</b>
          </article>
          <article>
            <span>Телефон</span>
            <b>{user?.phone || 'Не указан'}</b>
          </article>
          <article>
            <span>Роль</span>
            <b>{user?.role || 'user'}</b>
          </article>
        </div>
        <p className="profile-card__note">
          Эта страница доступна только после входа и использует JWT-токен из backend API.
        </p>
        <button className="ghost profile-card__logout" type="button" onClick={logout}>
          Выйти
        </button>
      </div>
    </section>
  )
}
