import { useInView } from '../hooks/useInView.js'
import { twoDigits } from '../utils/format.js'
import GeekBaziWorld from './worlds/GeekBaziWorld.jsx'
import MupraWorld from './worlds/MupraWorld.jsx'
import CatalogWorld from './worlds/CatalogWorld.jsx'
import MergeWorld from './worlds/MergeWorld.jsx'
import SeoWorld from './worlds/SeoWorld.jsx'
import SiteWorld from './worlds/SiteWorld.jsx'
import PrototypeWorld from './worlds/PrototypeWorld.jsx'
import LoreWorld from './worlds/LoreWorld.jsx'
import T from '../utils/Bidi.jsx'

const ARTIFACTS = {
  geekbazi: GeekBaziWorld,
  mupra: MupraWorld,
  catalog: CatalogWorld,
  merge: MergeWorld,
  seo: SeoWorld,
  site: SiteWorld,
  prototype: PrototypeWorld,
  lore: LoreWorld
}

/**
 * Each project is a world, not a card: the same three questions every time
 * (problem, what I did, result) and then an artifact that behaves like the work.
 */
export default function ProjectWorld({ project, index }) {
  const [ref, inView] = useInView({ threshold: 0.12 })
  const Artifact = ARTIFACTS[project.kind]

  return (
    <article
      className={`world reveal${inView ? ' is-in' : ''}`}
      id={`project-${project.id}`}
      ref={ref}
      style={{ '--accent': project.accent, '--tint': project.tint }}
    >
      <header className="world__head">
        <span className="world__index">{twoDigits(index + 1)}</span>
        <div>
          <h3 className="world__name">
            <T>{project.name}</T>
            {project.latin !== project.name && (
              <span className="world__latin" aria-hidden="true">
                {' '}
                {project.latin}
              </span>
            )}
          </h3>
          <p className="world__tag"><T>{project.tag}</T></p>
        </div>
        <ul className="world__roles">
          {project.roles.map((role) => (
            <li key={role}><T>{role}</T></li>
          ))}
        </ul>
      </header>

      <div className="world__narrative">
        <div>
          <h4>مسئله</h4>
          <p><T>{project.problem}</T></p>
        </div>
        <div>
          <h4>کاری که کردم</h4>
          <p><T>{project.approach}</T></p>
        </div>
        {project.outcome && (
          <div>
            <h4>نتیجه</h4>
            <p><T>{project.outcome}</T></p>
          </div>
        )}
      </div>

      {project.metrics && (
        <div className="world__metrics">
          <ul>
            {project.metrics.map((metric) => (
              <li key={metric.label}>
                <b><T>{metric.value}</T></b>
                <span><T>{metric.label}</T></span>
              </li>
            ))}
          </ul>
          {project.metricsNote && <p className="world-note">{project.metricsNote}</p>}
        </div>
      )}

      {Artifact && <Artifact project={project} />}

      {project.links && (
        <div className="world__links">
          {project.links.map((link) => (
            <a key={link.href} className="btn btn--outline" href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      )}

      {project.missing && (
        <p className="world__missing">
          در حال تکمیل: {project.missing.join('، ')}
        </p>
      )}
    </article>
  )
}
