import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'

export default function Modal() {
  const { modalOpen, setModalOpen } = useApp()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '' })
  const [errors, setErrors] = useState({})

  if (!modalOpen) return null

  const closeModal = () => {
    setModalOpen(false)
    setSent(false)
    setForm({ name: '', phone: '' })
    setErrors({})
  }

  const updateField = (field, value) => {
    setErrors((current) => ({ ...current, [field]: '' }))
    setForm((current) => ({ ...current, [field]: value }))
  }

  const updatePhone = (value) => {
    updateField('phone', value.replace(/\D/g, '').slice(0, 11))
  }

  const submitForm = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (form.name.trim().length < 2) nextErrors.name = 'Введите ваше имя'
    if (form.phone.replace(/\D/g, '').length < 10) nextErrors.phone = 'Введите номер телефона'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setSent(true)
  }

  return <div className="modal" onClick={closeModal}>
    <div className="modal__card" onClick={(event) => event.stopPropagation()}>
      <button className="modal__close" type="button" onClick={closeModal}>×</button>
      {sent ? <><h2>Заявка отправлена ✅</h2><p>Менеджер свяжется с вами для расчёта бани.</p></> : <>
        <h2>Получить расчёт</h2><p>Оставьте данные, и мы подготовим предварительный расчет.</p>
        <form className="modal__form" onSubmit={submitForm}>
          <label>
            <input className={errors.name ? 'is-invalid' : ''} value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Ваше имя" autoComplete="name" />
            {errors.name && <span>{errors.name}</span>}
          </label>
          <label>
            <input className={errors.phone ? 'is-invalid' : ''} value={formatPhone(form.phone)} onChange={(event) => updatePhone(event.target.value)} placeholder="+7(___)___-__-__" inputMode="tel" autoComplete="tel" />
            {errors.phone && <span>{errors.phone}</span>}
          </label>
          <button className="primary" type="submit">Отправить</button>
        </form>
      </>}
    </div>
  </div>
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, '')
  const normalized = digits.startsWith('8') ? `7${digits.slice(1)}` : digits.startsWith('7') ? digits : digits ? `7${digits}` : ''
  const body = normalized.slice(1, 11)
  const part1 = body.slice(0, 3)
  const part2 = body.slice(3, 6)
  const part3 = body.slice(6, 8)
  const part4 = body.slice(8, 10)
  let result = normalized ? '+7' : ''
  if (part1) result += `(${part1}`
  if (part1.length === 3) result += ')'
  if (part2) result += part1.length === 3 ? ` ${part2}` : part2
  if (part3) result += `-${part3}`
  if (part4) result += `-${part4}`
  return result
}
