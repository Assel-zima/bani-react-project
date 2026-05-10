import { useState } from 'react'

const calculatorImages = '/images/full-calculator/'
const quizOptions = [
  ['Баня из бруса', 'banya-brus.jpg'],
  ['Баня из бревна', 'banya-brevno.jpg'],
  ['Каркасная баня', 'banya-karkas.jpg'],
  ['Баня-бочка', 'banya-bochka.png'],
  ['Мобильная баня', 'banya-mobile.jpg'],
  ['Дом-баня', 'banya-dom.jpg'],
]
const quizImportantOptions = [
  'Материал стен (дерево, кирпич и т.д.)',
  'Площадь бани',
  'Тип крыши (односкатная, двускатная и т.д.)',
  'Наличие и тип фундамента',
  'Тип отделки (внутренней и внешней)',
  'Наличие дополнительных строений (терраса, бассейн и т.д.)',
]
const quizVariantOptions = [
  'Готовый типовой проект',
  'Индивидуальный проект',
  'Нужна консультация мастера',
  'Хочу сравнить варианты',
  'Пока выбираю материал',
  'Нужен быстрый расчет',
]
const contactMethods = ['WhatsApp', 'Telegram', 'Email']

export default function CalculatorBlock() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedOptions, setSelectedOptions] = useState([])
  const [selectedVariant, setSelectedVariant] = useState('')
  const [selectedContactMethod, setSelectedContactMethod] = useState('WhatsApp')
  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [formError, setFormError] = useState('')
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const progress = currentStep * 25

  const toggleImportantOption = (option) => {
    setShowHint(false)
    setSelectedOptions((items) => items.includes(option) ? items.filter((item) => item !== option) : [...items, option])
  }

  const canGoNext = currentStep === 1 ? Boolean(selectedOption) : currentStep === 2 ? selectedOptions.length > 0 : currentStep === 3 ? Boolean(selectedVariant) : true

  const handleNext = () => {
    if (!canGoNext) {
      setShowHint(true)
      return
    }
    setShowHint(false)
    setCurrentStep((step) => Math.min(step + 1, 4))
  }

  const handleBack = () => {
    setShowHint(false)
    setCurrentStep((step) => Math.max(step - 1, 1))
  }

  const handleQuizSubmit = () => {
    if (!userName.trim() || !userPhone.trim()) {
      setFormError('Заполните имя и телефон')
      return
    }
    setFormError('')
    const requestText = [
      'от сайта .alphaedu.tech',
      'Здравствуйте! Хочу получить расчет стоимости бани.',
      '',
      'Ответы калькулятора:',
      `1. Материал: ${selectedOption || 'не выбран'}`,
      `2. Параметры: ${selectedOptions.length ? selectedOptions.join(', ') : 'не выбраны'}`,
      `3. Вариант: ${selectedVariant || 'не выбран'}`,
      '',
      'Контакты:',
      `Имя: ${userName.trim()}`,
      `Телефон: ${userPhone.trim()}`,
      `Способ связи: ${selectedContactMethod}`,
    ].join('\n')
    const encodedText = encodeURIComponent(requestText)
    let link = ''
    if (selectedContactMethod === 'WhatsApp') {
      link = `https://wa.me/77086646240?text=${encodedText}`
    } else if (selectedContactMethod === 'Telegram') {
      link = `https://t.me/your_telegram_username?text=${encodedText}`
    } else {
      link = `mailto:example@mail.com?subject=${encodeURIComponent('Расчет стоимости бани')}&body=${encodedText}`
    }
    window.open(link, '_blank')
    setIsQuizSubmitted(true)
  }

  const renderQuizStep = () => {
    if (currentStep === 1) {
      return <>
        <b>Вопрос 1</b><h3>Из какого материала планируете строить?</h3>
        <div className="quiz-options">{quizOptions.map(([title,img])=><button className={selectedOption === title ? 'active' : ''} key={title} type="button" onClick={() => { setSelectedOption(title); setShowHint(false) }}><img src={calculatorImages+img} alt={title}/><span>{title}</span></button>)}</div>
      </>
    }
    if (currentStep === 2) {
      return <>
        <b>Вопрос 2</b><h3>Какие параметры важны?</h3>
        <div className="quiz-options quiz-options--text">{quizImportantOptions.map((option)=><button className={selectedOptions.includes(option) ? 'active' : ''} key={option} type="button" onClick={() => toggleImportantOption(option)}><span>{option}</span></button>)}</div>
      </>
    }
    if (currentStep === 3) {
      return <>
        <b>Вопрос 3</b><h3>Выберите вариант</h3>
        <div className="quiz-options quiz-options--text">{quizVariantOptions.map((option)=><button className={selectedVariant === option ? 'active' : ''} key={option} type="button" onClick={() => { setSelectedVariant(option); setShowHint(false) }}><span>{option}</span></button>)}</div>
      </>
    }
    if (isQuizSubmitted) {
      return <div className="quiz-final quiz-final--thanks">
        <div className="quiz-final__content">
          <b>Расчет отправлен</b>
          <h3>Спасибо за обращение</h3>
          <p>Мы скоро свяжемся с вами</p>
          <button className="quiz-submit" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>На главную</button>
        </div>
      </div>
    }
    return <div className="quiz-final">
      <div className="quiz-final__content">
        <b>Расчет готов</b>
        <h3>Где вам удобней получить расчет стоимости?</h3>
        <div className="quiz-contact-methods">{contactMethods.map((method)=><button className={selectedContactMethod === method ? 'active' : ''} type="button" key={method} onClick={() => setSelectedContactMethod(method)}>{method}</button>)}</div>
        <input placeholder="Ваше имя" value={userName} onChange={(event) => { setUserName(event.target.value); setFormError('') }} />
        <input placeholder="Ваш номер WhatsApp" value={userPhone} onChange={(event) => { setUserPhone(event.target.value); setFormError('') }} />
        {formError && <p className="quiz-form-error">{formError}</p>}
        <button className="quiz-submit" type="button" onClick={handleQuizSubmit}>Получить расчет</button>
      </div>
      <img className="quiz-final__image" src={calculatorImages+'calc-banner.png'} alt="Получить расчет" />
    </div>
  }

  return (
    <section className="white-section quiz-block"><div className="section-container quiz-container">
      <h2>В КАЛЬКУЛЯТОРЕ ВЫ МОЖЕТЕ РАССЧИТАТЬ<br/>ПРЕДВАРИТЕЛЬНУЮ СТОИМОСТЬ БАНИ ПО<br/>ВАШИМ ПАРАМЕТРАМ</h2><p className="muted">Это интересно и бесплатно!</p>
      <div className="quiz-wrap"><aside><span className="status">Онлайн</span><img src={calculatorImages+'consultant.png'} alt="Артем Лошиневич" /><h3>АРТЕМ ЛОШИНЕВИЧ</h3><p>Старший мастер</p><small>Поможет подобрать материал, планировку и рассчитать предварительную стоимость проекта.</small><div className="master-actions"><span>РАСЧЕТ СТОИМОСТИ</span><span>КАТАЛОГ ПРОЕКТОВ</span></div></aside><div className="quiz-card"><div className="progress" style={{'--progress': `${progress}%`}}><span>Расчет пройден на {progress}%</span></div>{renderQuizStep()}<div className="quiz-actions">{currentStep > 1 && <button className="quiz-back" type="button" onClick={handleBack}>Назад</button>}<div className="quiz-next-wrap">{showHint && <div className="quiz-hint">Чтобы продолжить ответьте на вопрос выше</div>}{currentStep < 4 && <button className="next-btn" type="button" onClick={handleNext}>ДАЛЕЕ</button>}</div></div></div></div>
    </div></section>
  )
}
