import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="notfound">
      <h1>404</h1>
      <p>Такой страницы нет.</p>
      <Link className="primary" to="/">На главную</Link>
    </section>
  )
}
