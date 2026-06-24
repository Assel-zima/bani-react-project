import { FaClock, FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaTelegramPlane, FaViber, FaVk, FaWhatsapp } from 'react-icons/fa'

const A = '/assets/content/'
const yandexMapUrl = 'https://yandex.kz/maps/org/nurly_orda/72255833797/?ll=71.408858%2C51.139051&mode=search&sll=71.408858%2C51.139051&sspn=0.035534%2C0.014781&text=%D1%83%D0%BB.%20%D0%9A%D0%B0%D0%B1%D0%B0%D0%BD%D0%B1%D0%B0%D0%B9%20%D0%B1%D0%B0%D1%82%D1%8B%D1%80%D0%B0%2C%2010%D0%90%20%D0%BE%D1%80%D0%B8%D0%B5%D0%BD%D1%82%D0%B8%D1%80%20%E2%80%94%20%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81-%D1%86%D0%B5%D0%BD%D1%82%D1%80&z=16'
const yandexMapWidgetUrl = 'https://yandex.kz/map-widget/v1/?ll=71.408858%2C51.139051&mode=search&oid=72255833797&ol=biz&z=16'

export default function SiteFooter() {
  return (
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
          <span>Сделано с любовью<br/><a href="#top">sss</a></span>
        </div>
      </div>
    </footer>
  )
}
