import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

export default function Register() {
  const { isAuthenticated, register } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await register(form)
      navigate('/profile', { replace: true })
    } catch (err) {
      setError(err.message || 'Не удалось зарегистрироваться')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="auth-card__eyebrow">Новый клиент</p>
        <h1>Регистрация</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Имя
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
              minLength={2}
              autoComplete="name"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
              autoComplete="email"
            />
          </label>
          <label>
            Телефон
            <input
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
              autoComplete="tel"
            />
          </label>
          <label>
            Пароль
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </label>
          {error && <span className="auth-card__error">{error}</span>}
          <button className="primary auth-card__button" type="submit" disabled={loading}>
            {loading ? 'Создаем...' : 'Создать аккаунт'}
          </button>
        </form>
        <p className="auth-card__switch">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </section>
  )
}
