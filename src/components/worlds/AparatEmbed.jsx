import EvidenceLinks from './EvidenceLinks.jsx'
import T from '../../utils/Bidi.jsx'

/**
 * Aparat player.
 *
 * The video shows itself. An earlier version hid every player behind a paper
 * card you had to click, which saved a few requests and cost the section its
 * looks: four grey rectangles where the work should be. The iframe is lazy
 * instead, so nothing loads until the visitor scrolls the video into view.
 */
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
        <a className="is-playable" href={video.url} target="_blank" rel="noopener noreferrer">
          دیدن در آپارات
        </a>
      </figcaption>
      <EvidenceLinks forKey={`aparat-${video.hash}`} compact />
    </figure>
  )
}
