import { useEffect, useRef, useState } from 'react'
import { process } from '../data/content.js'
import './ProcessAnimation.css'
import T from '../utils/Bidi.jsx'

/**
 * Chapter four: the method, shown as a path.
 *
 * Scrolling through this section moves a marker along the line while scattered
 * dots snap onto it, repeating the promise the desk made at the top of the page.
 */
export default function ProcessAnimation() {
  const sectionRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [openStep, setOpenStep] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const node = sectionRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const total = rect.height + window.innerHeight
      const seen = window.innerHeight - rect.top
      setProgress(Math.min(1, Math.max(0, seen / total)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const reached = Math.round(progress * (process.steps.length + 0.5))

  return (
    <section className="section process" id="process" ref={sectionRef}>
      <div className="process__head">
        <span className="section__kicker">{process.kicker}</span>
        <h2 className="section__title">{process.title}</h2>
        <p className="section__lead">{process.lead}</p>
      </div>

      <div className="process__track" style={{ '--progress': progress }}>
        <span className="process__line" aria-hidden="true" />
        <ol className="process__steps">
          {process.steps.map((step, index) => {
            const isPassed = index < reached
            const isOpen = openStep === index
            return (
              <li key={step.id} className={`step${isPassed ? ' is-passed' : ''}${isOpen ? ' is-open' : ''}`}>
                <button type="button" onClick={() => setOpenStep(isOpen ? -1 : index)} aria-expanded={isOpen}>
                  <span className="step__dot" aria-hidden="true" />
                  <span className="step__title">{step.title}</span>
                  <span className="step__text"><T>{step.text}</T></span>
                </button>
                <p className="step__example">
                  <b>در عمل: </b>
                  <T>{step.example}</T>
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
