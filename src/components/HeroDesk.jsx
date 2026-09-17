import { useState } from 'react'
import { hero } from '../data/content.js'
import BrandFrame from './BrandFrame.jsx'
import ScatteredElements from './ScatteredElements.jsx'
import './BrandFrame.css'
import './HeroDesk.css'

/** Chapter one: the visitor arrives at Yas's desk while it is still alive with ideas. */
export default function HeroDesk() {
  const [progress, setProgress] = useState({ done: 0, total: 0 })
  const complete = progress.total > 0 && progress.done === progress.total
  const illustration = `${import.meta.env.BASE_URL}assets/svg/yas-desk.svg`

  return (
    <section className={`hero${complete ? ' is-sorted' : ''}`} id="start">
      <BrandFrame />
      <ScatteredElements onProgress={(done, total) => setProgress({ done, total })} />

      <div className="hero__inner">
        <div className="hero__copy">
          <h1 className="hero__hello">
            {hero.hello}
            <span className="sr-only">{hero.seoTitle}</span>
          </h1>
          <p className="hero__name">{hero.name}</p>
          <p className="hero__role">{hero.role}</p>
          <p className="hero__welcome">{hero.welcome}</p>

          <div className="hero__cta">
            <a className="btn btn--solid" href={hero.ctaPrimary.href}>
              {hero.ctaPrimary.label}
            </a>
            <a className="btn btn--outline" href={hero.ctaSecondary.href} download>
              {hero.ctaSecondary.label}
            </a>
          </div>

          <p className={`hero__note${complete ? ' is-done' : ''}`}>
            {complete ? hero.organizedLine : hero.note}
          </p>
        </div>

        <div className="hero__illustration">
          <img src={illustration} alt="تصویرسازی یاس پشت لپ‌تاپ" />
        </div>
      </div>

      <a className="hero__scroll" href="#about">
        {hero.scrollHint}
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  )
}
