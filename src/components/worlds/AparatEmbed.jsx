import EvidenceLinks from './EvidenceLinks.jsx'
import T from '../../utils/Bidi.jsx'

/** Aparat player, embedded directly (no extra click-to-load step). */
export default function AparatEmbed({ video }) {
  const src = `https://www.aparat.com/video/video/embed/videohash/${video.hash}/vt/frame?titleShow=true`

  return (
    <figure className="aparat">
      <div className="aparat__frame">
        <iframe title={video.title} src={src} allowFullScreen loading="lazy" />
      </div>
      <figcaption>
        <b><T>{video.title}</T></b>
        <span><T>{video.role}</T></span>
        <a className="is-playable" href={video.url} target="_blank" rel="noreferrer">
          دیدن در آپارات
        </a>
      </figcaption>
      <EvidenceLinks forKey={`aparat-${video.hash}`} compact />
    </figure>
  )
}
