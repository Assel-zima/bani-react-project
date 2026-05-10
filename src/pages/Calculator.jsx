import { useState } from 'react'

export default function Calculator(){
  const [area,setArea]=useState(24); const [level,setLevel]=useState(70000); const total = area * level
  return <section className="calculator"><div><p className="eyebrow">Интерактив</p><h1>Калькулятор стоимости бани</h1><p>Передвигайте ползунки и получите примерный расчёт.</p></div><div className="calc-card"><label>Площадь: <b>{area} м²</b><input type="range" min="12" max="80" value={area} onChange={e=>setArea(+e.target.value)}/></label><label>Уровень отделки<input type="range" min="50000" max="120000" step="10000" value={level} onChange={e=>setLevel(+e.target.value)}/></label><h2>{total.toLocaleString('ru-RU')} ₸</h2></div></section>
}
