import { docUrl, evidenceFor } from '../../data/writing.js'
import T from '../../utils/Bidi.jsx'

/**
 * Proof sitting next to the work.
 *
 * Every video, reel and campaign here has writing behind it, so the scenario
 * opens as a real file and the published reel opens on Instagram.
 */
export default function EvidenceLinks({ forKey, compact = false }) {
  const evidence = forKey ? evidenceFor(forKey) : null
  if (!evidence) return null
  const { docs = [], reels = [], note } = evidence
  if (!docs.length && !reels.length && !note) return null

  return (
    <div className={`evidence${compact ? ' evidence--compact' : ''}`}>
      <span className="evidence__label">نوشته من، قابل دیدن</span>
      <div className="evidence__row">
        {docs.map((doc) => (
          <a
            key={doc.slug}
            className="evidence__link evidence__link--doc is-playable"
            href={docUrl(doc.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span aria-hidden="true">۞</span>
            <T>{doc.label}</T>
          </a>
        ))}
        {reels.map((reel) => (
          <a
            key={reel.url}
            className="evidence__link evidence__link--reel is-playable"
            href={reel.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span aria-hidden="true">▶</span>
            <T>{reel.label}</T>
          </a>
        ))}
      </div>
      {note && <p className="evidence__note"><T>{note}</T></p>}
    </div>
  )
}
