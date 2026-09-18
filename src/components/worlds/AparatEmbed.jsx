import { useState } from 'react'
import EvidenceLinks from './EvidenceLinks.jsx'
import T from '../../utils/Bidi.jsx'

/**
 * Aparat player, loaded on click.
 *
 * The embed pulls third party scripts, so it stays out of the first paint:
 * the visitor sees a paper card and the player appears when they ask for it.
 */
export default function AparatEmbed({ video }) {
  const [playing, setPlaying] = useState(false)
  const src = `https://www.aparat.com/video/video/embed/videohash/${video.hash}/vt/frame?titleShow=true&autoplay=true`

  return (
    <figure className="aparat">
      <div className="aparat__frame">
        {playing ? (
          <iframe title={video.title} src={src} allowFullScreen loading="lazy" />
        ) : (
          <button type="button" className="aparat__poster is-playable" onClick={() => setPlaying(true)}>
            <span className="aparat__play" aria-hidden="true">▶</span>
            <span className="aparat__posterlabel">
              <b><T>{video.title}</T></b>
              <span>ویدیو رو اینجا باز کنید</span>
            </span>
          </button>
        )}
      </div>
      <figcaption>
        <b><T>{video.title}</T></b>
        <span><T>{video.role}</T></span>
        <a className="is-playable" href={video.url} target="_blank" rel="noopener noreferrer">
          دیدن در آپارات
        </a>
      </figcaption>
      <EvidenceLinks forKey={`aparat-${video.hash}`} compact />
    </figure>
  )
}
