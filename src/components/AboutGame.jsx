import { useState } from 'react'
import { aboutGame } from '../data/content.js'
import T from '../utils/Bidi.jsx'
import './AboutGame.css'

/**
 * «Who I am» as a small interaction. The visitor asks, I answer in my own
 * voice, and every answer points at work that exists further down the page.
 */
export default function AboutGame() {
  const [asked, setAsked] = useState([])
  const [current, setCurrent] = useState(null)
  const answer = current === null ? null : aboutGame.prompts[current]
  const allAsked = asked.length === aboutGame.prompts.length

  const ask = (index) => {
    setCurrent(index)
    setAsked((previous) => (previous.includes(index) ? previous : [...previous, index]))
  }

  return (
    <div className="askme">
      <div className="askme__head">
        <p className="playhint">{aboutGame.hint}</p>
        <h3>{aboutGame.title}</h3>
      </div>

      <ul className="askme__prompts">
        {aboutGame.prompts.map((prompt, index) => (
          <li key={prompt.q}>
            <button
              type="button"
              className={`askme__chip is-playable${index === current ? ' is-active' : ''}${
                asked.includes(index) ? ' is-asked' : ''
              }`}
              onClick={() => ask(index)}
              aria-pressed={index === current}
            >
              <T>{prompt.q}</T>
            </button>
          </li>
        ))}
      </ul>

      <div className="askme__answer" aria-live="polite">
        {answer ? (
          <>
            <p className="askme__text" key={answer.q}><T>{answer.a}</T></p>
            {answer.source && <span className="askme__source"><T>{answer.source}</T></span>}
          </>
        ) : (
          <p className="askme__empty"><T>{aboutGame.empty}</T></p>
        )}
      </div>

      {allAsked && <p className="askme__done"><T>{aboutGame.done}</T></p>}
    </div>
  )
}
