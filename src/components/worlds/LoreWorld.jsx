import FigmaPrototype from './FigmaPrototype.jsx'
import T from '../../utils/Bidi.jsx'

/**
 * LORE is a product Yas is designing end to end, so its world shows the
 * decisions: the locked first flow, the archetypes, the palette and the rules.
 */
export default function LoreWorld({ project }) {
  return (
    <div className="world-body lore">
      <FigmaPrototype prototype={project.prototype} />

      <p className="lore__tagline ltr-edge" lang="en">{project.tagline}</p>

      <div className="lore__split">
        <ol className="flow">
          {project.flow.map((step) => (
            <li key={step.q}>
              <span className="flow__label">{step.q}</span>
              <b className="ltr-edge" lang="en">{step.title}</b>
              <span className="flow__note"><T>{step.note}</T></span>
            </li>
          ))}
        </ol>

        <figure className="lore__video">
          <video src={project.video.src} poster={project.video.poster} controls preload="none" playsInline />
          <figcaption><T>{project.video.title}</T></figcaption>
        </figure>
      </div>

      <ul className="archetypes">
        {project.archetypes.map((item) => (
          <li key={item.name}>
            <b className="ltr-edge" lang="en">{item.name}</b>
            <span><T>{item.line}</T></span>
          </li>
        ))}
      </ul>

      <ul className="palette" aria-label="سیستم رنگ LORE">
        {project.palette.map((color) => (
          <li key={color.hex}>
            <span className="palette__chip" style={{ background: color.hex }} aria-hidden="true" />
            <b className="ltr-edge" lang="en">{color.name}</b>
            <code>{color.hex}</code>
            <span className="palette__use"><T>{color.use}</T></span>
          </li>
        ))}
      </ul>

      <ul className="principles">
        {project.principles.map((rule) => (
          <li key={rule}><T>{rule}</T></li>
        ))}
      </ul>

      <a className="btn btn--outline" href={project.deck.href} target="_blank" rel="noopener noreferrer">
        {project.deck.label}
      </a>
    </div>
  )
}
