import { useState } from 'react'

/**
 * Figma prototypes load only after the visitor asks for them, so the page stays
 * fast and no third-party frame runs before it is wanted.
 */
export default function FigmaPrototype({ prototype }) {
  const [loaded, setLoaded] = useState(false)
  if (!prototype) return null

  return (
    <div className="proto">
      <div className="proto__frame">
        {loaded ? (
          <iframe
            title={prototype.label}
            src={prototype.embed}
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button type="button" className="proto__load" onClick={() => setLoaded(true)}>
            <span>پروتوتایپ را همین‌جا باز کن</span>
            <small>قابل کلیک، مثل نسخهٔ واقعی</small>
          </button>
        )}
      </div>
      {prototype.caption && <p className="proto__caption">{prototype.caption}</p>}
      <a className="btn btn--outline" href={prototype.link} target="_blank" rel="noopener noreferrer">
        {prototype.label}
      </a>
    </div>
  )
}
