import { useState } from 'react'
import { FaArrowRight, FaClock, FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaTelegramPlane, FaViber, FaVk, FaWhatsapp } from 'react-icons/fa'

const A = '/assets/content/'
const yandexMapUrl = 'https://yandex.kz/maps/org/nurly_orda/72255833797/?ll=71.408858%2C51.139051&mode=search&sll=71.408858%2C51.139051&sspn=0.035534%2C0.014781&text=%D1%83%D0%BB.%20%D0%9A%D0%B0%D0%B1%D0%B0%D0%BD%D0%B1%D0%B0%D0%B9%20%D0%B1%D0%B0%D1%82%D1%8B%D1%80%D0%B0%2C%2010%D0%90%20%D0%BE%D1%80%D0%B8%D0%B5%D0%BD%D1%82%D0%B8%D1%80%20%E2%80%94%20%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81-%D1%86%D0%B5%D0%BD%D1%82%D1%80&z=16'
const yandexMapWidgetUrl = 'https://yandex.kz/map-widget/v1/?ll=71.408858%2C51.139051&mode=search&oid=72255833797&ol=biz&z=16'

export default function Contacts() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [agreed, setAgreed] = useState(true)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const updateField = (field, value) => {
    setSent(false)
    setErrors((current) => ({ ...current, [field]: '' }))
    setForm((current) => ({ ...current, [field]: value }))
  }

  const updatePhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    updateField('phone', digits)
  }

  const validateForm = () => {
    const nextErrors = {}
    if (form.name.trim().length < 2) nextErrors.name = 'Введите ваше имя'
    if (form.phone.replace(/\D/g, '').length < 10) nextErrors.phone = 'Введите номер телефона'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) nextErrors.email = 'Введите корректный e-mail'
    if (form.message.trim().length < 5) nextErrors.message = 'Введите текст сообщения'
    if (!agreed) nextErrors.agreed = 'Подтвердите согласие'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validateForm()) {
      setSent(false)
      return
    }
    setSent(true)
  }

  return (
    <section className="contacts-page">
      <div className="contacts-page__inner">
        <h1>КОНТАКТЫ</h1>

        <div className="contacts-page__grid">
          <aside className="contacts-info">
            <h2>СВЯЖИТЕСЬ С<br/>НАМИ</h2>
            <ul>
              <li><span><FaMapMarkerAlt /></span><p>г. Астана, просп. Кабанбай батыра 11/5<br/>Нұрлы Орда Бизнес - центр</p></li>
              <li><span><FaClock /></span><p>Пн-Пт: 9:00 - 18:00<br/>Сб-Вс - выходные</p></li>
              <li><span><FaPhoneAlt /></span><p><b>+7 708 664 62 40</b></p></li>
              <li><span><FaEnvelope /></span><p>aselasa7@gmail.com</p></li>
            </ul>

            <p className="contacts-info__label">Пишите, мы онлайн</p>
            <div className="contacts-info__socials">
              <a href="https://wa.me/77086646240" target="_blank" rel="noreferrer" aria-label="Viber"><FaViber /></a>
              <a href="https://wa.me/77086646240" target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
              <a href="https://t.me/your_telegram_username" target="_blank" rel="noreferrer" aria-label="Telegram"><FaTelegramPlane /></a>
            </div>

            <p className="contacts-info__label">Мы в соцсетях</p>
            <div className="contacts-info__socials contacts-info__socials--media">
              <a href="#top" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#top" aria-label="Instagram"><FaInstagram /></a>
              <a href="#top" aria-label="VK"><FaVk /></a>
            </div>
          </aside>

          <div className="contacts-gallery">
            <GalleryBlock title="Наш офис" main="contacts-1.jpg" sideA="contacts-2.jpg" sideB="contacts-3.jpg" />
            <GalleryBlock title="Во время работы" main="portfolio-1.jpg" sideA="work-steps-3.png" sideB="our-works-1.jpg" />
          </div>

          <form className="contacts-form" onSubmit={handleSubmit}>
            <h2>Ответим в течение дня,<br/>заполните форму</h2>
            <input className={errors.name ? 'is-invalid' : ''} value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Ваше имя" autoComplete="name" />
            {errors.name && <span className="contacts-form__error">{errors.name}</span>}
            <input className={errors.phone ? 'is-invalid' : ''} value={formatPhone(form.phone)} onChange={(event) => updatePhone(event.target.value)} placeholder="+7(___)___-__-__" inputMode="tel" autoComplete="tel" />
            {errors.phone && <span className="contacts-form__error">{errors.phone}</span>}
            <input className={errors.email ? 'is-invalid' : ''} value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="Ваш e-mail" inputMode="email" autoComplete="email" />
            {errors.email && <span className="contacts-form__error">{errors.email}</span>}
            <textarea className={errors.message ? 'is-invalid' : ''} value={form.message} onChange={(event) => updateField('message', event.target.value)} placeholder="Текст сообщения" />
            {errors.message && <span className="contacts-form__error">{errors.message}</span>}
            <button type="submit">ОТПРАВИТЬ <FaArrowRight /></button>
            <label className={`contacts-form__policy ${errors.agreed ? 'is-invalid' : ''}`}>
              <input type="checkbox" checked={agreed} onChange={(event) => { setAgreed(event.target.checked); setErrors((current) => ({ ...current, agreed: '' })) }} />
              <span>Согласен с условиями <a href="#top">политики конфиденциальности данных</a></span>
            </label>
            {errors.agreed && <span className="contacts-form__error contacts-form__error--center">{errors.agreed}</span>}
            {sent && <p className="contacts-form__success">Спасибо! Форма готова к отправке.</p>}
          </form>
        </div>

        <div className="contacts-map-section">
          <div className="contacts-map-section__head">
            <h2>Мы на карте</h2>
            <a href={yandexMapUrl} target="_blank" rel="noreferrer">Схема проезда</a>
          </div>
          <div className="contacts-map">
            <iframe src={yandexMapWidgetUrl} title="Карта офиса Нұрлы Орда" loading="lazy" allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </section>
  )
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

function GalleryBlock({ title, main, sideA, sideB }) {
  return (
    <div className="contacts-gallery__block">
      <h2>{title}</h2>
      <div className="contacts-gallery__grid">
        <img className="contacts-gallery__main" src={A + main} alt={title} />
        <img src={A + sideA} alt="" />
        <img src={A + sideB} alt="" />
      </div>
    </div>
  )
}
