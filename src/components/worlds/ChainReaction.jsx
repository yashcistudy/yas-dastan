import { useRef, useState } from 'react'
import EvidenceLinks from './EvidenceLinks.jsx'
import T from '../../utils/Bidi.jsx'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import { toPersianDigits } from '../../utils/format.js'

/**
 * Chain Reaction: the Mehrayan teaser, told the way it was made.
 *
 * The stages are scattered studs that connect one by one. Hovering or focusing
 * a stud links it to the chain and opens that stage, so the section performs
 * the idea of the film itself: one small action reveals the next world.
 * The video is not a thumbnail, it is the stage the chain leads to.
 */
export default function ChainReaction({ chain }) {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const stages = chain.stages
  const current = stages[active]
  const isVideoStage = current.id === 'teaser'

  const play = () => {
    setPlaying(true)
    requestAnimationFrame(() => videoRef.current?.play().catch(() => {}))
  }

  const openStage = (index) => {
    setActive(index)
    if (stages[index].id === 'teaser') return
    if (playing) videoRef.current?.pause()
  }

  return (
    <section className="chain" aria-labelledby="chain-title">
      <header className="chain__head">
        <p className="chain__kicker">ریزپرونده</p>
        <h4 id="chain-title">{chain.title}</h4>
        <p className="chain__subtitle"><T>{chain.subtitle}</T></p>
        <p className="chain__lead"><T>{chain.lead}</T></p>
        <p className="chain__hint playhint">می‌تونید کل داستان رو با کلیک کردن روی این مسیر تجربه کنید.</p>
        <EvidenceLinks forKey="chain-teaser" />
      </header>

      <ol
        className={`chain__track${reducedMotion ? ' is-still' : ''}`}
        style={{ '--progress': `${(active / (stages.length - 1)) * 100}%` }}
      >
        {stages.map((stage, index) => (
          <li key={stage.id} className={index <= active ? 'is-linked' : undefined}>
            <button
              type="button"
              className={index === active ? 'is-active' : undefined}
              onMouseEnter={() => openStage(index)}
              onFocus={() => openStage(index)}
              onClick={() => {
                openStage(index)
                if (stage.id === 'teaser') play()
              }}
              aria-pressed={index === active}
            >
              <span className="chain__stud" aria-hidden="true" />
              <span className="chain__label">{stage.label}</span>
              <span className="chain__step">{toPersianDigits(index + 1)}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="chain__stage" key={current.id}>
        <div className="chain__text">
          <h5><T>{current.title}</T></h5>
          <p><T>{current.text}</T></p>
          {isVideoStage && !playing && (
            <button type="button" className="btn btn--solid" onClick={play}>
              پخش تیزر
            </button>
          )}
        </div>

        <figure className={`chain__film${isVideoStage ? ' is-open' : ''}`}>
          <video
            ref={videoRef}
            src={chain.video.src}
            poster={chain.video.poster}
            controls
            preload="none"
            playsInline
            onPlay={() => {
              setPlaying(true)
              const index = stages.findIndex((stage) => stage.id === 'teaser')
              if (index > -1) setActive(index)
            }}
          />
          <figcaption><T>{chain.video.caption}</T></figcaption>
        </figure>
      </div>

      <div className="chain__meta">
        <div>
          <h5>یک روز کاری</h5>
          <ul className="chain__timeline">
            {chain.timeline.map((item) => (
              <li key={item.time}>
                <b>{item.time}</b>
                <span><T>{item.text}</T></span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5>تیم</h5>
          <ul className="chain__credits">
            {chain.credits.map((person) => (
              <li key={person.name}>
                <b>{person.name}</b>
                <span><T>{person.role}</T></span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="chain__status"><T>{chain.status}</T></p>
    </section>
  )
}
