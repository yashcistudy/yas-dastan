import { useEffect, useRef } from 'react'
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
/**
 * Aparat's own script embed (used where a video carries an `embed` config).
 * The script is appended on mount and cleaned up on unmount, which also keeps
 * React StrictMode's double-run from creating two players.
 */
function AparatScriptEmbed({ embed }) {
  const host = useRef(null)

  useEffect(() => {
    const el = host.current
    if (!el) return undefined
    el.innerHTML = ''
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://www.aparat.com/embed/${embed.id}?data[rnddiv]=${embed.div}&data[responsive]=yes&titleShow=true`
    el.appendChild(script)
    return () => { el.innerHTML = '' }
  }, [embed.id, embed.div])

  return <div id={embed.div} ref={host} />
}

export default function AparatEmbed({ video }) {
  const src = `https://www.aparat.com/video/video/embed/videohash/${video.hash}/vt/frame?titleShow=true`

  return (
    <figure className="aparat">
      {video.embed ? (
        <div className="aparat__frame aparat__frame--script">
          <AparatScriptEmbed embed={video.embed} />
        </div>
      ) : (
        <div className="aparat__frame">
          <iframe title={video.title} src={src} allowFullScreen loading="lazy" />
        </div>
      )}
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
