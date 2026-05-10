import { useEffect, useState } from 'react'
import { reviews } from '../data/services.js'
import { getUsers } from '../api/api.js'
import Loader from '../components/Loader.jsx'

export default function Reviews() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUsers(3).then((data) => setUsers(data.users)).finally(() => setLoading(false))
  }, [])

  return (
    <section className="section page">
      <div className="section__head">
        <p className="eyebrow">Отзывы</p>
        <h1>Клиенты и специалисты</h1>
      </div>
      <div className="reviews">
        {reviews.map((review) => (
          <article key={review.name}>
            <img src={review.image} alt={review.name} />
            <h3>{review.name}, {review.city}</h3>
            <p>{review.text}</p>
          </article>
        ))}
      </div>
      <h2>Команда из API</h2>
      {loading ? <Loader /> : <div className="team">{users.map((user) => <div key={user.id}><b>{user.firstName} {user.lastName}</b><span>{user.email}</span></div>)}</div>}
    </section>
  )
}
