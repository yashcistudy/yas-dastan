import { useState } from 'react'
import AparatEmbed from './AparatEmbed.jsx'
import EvidenceLinks from './EvidenceLinks.jsx'
import WritingArchive from '../WritingArchive.jsx'
import { rulebooks, docUrl } from '../../data/writing.js'
import T from '../../utils/Bidi.jsx'

const TABS = [
  { id: 'scenes', label: 'سناریوها' },
  { id: 'video', label: 'ریلز و ویدیو' },
  { id: 'aparat', label: 'آپارات' },
  { id: 'boardgame', label: 'عشق عددی' },
  { id: 'proof', label: 'عدد و مدرک' },
  { id: 'library', label: 'آرشیو' },
  { id: 'campaigns', label: 'کمپین‌ها' }
]

/** GeekBazi is the widest world, so it opens in chapters instead of one long column. */
export default function GeekBaziWorld({ project }) {
  const [tab, setTab] = useState('scenes')
  const [scene, setScene] = useState(0)
  const active = project.scenes[scene]

  return (
    <div className="world-body">
      <p className="playhint playhint--inline">هفت برچسب اینجاست؛ هرکدوم رو بزنید یه تکه از کار رو می‌بینید.</p>
      <div className="tabs is-playable" role="tablist" aria-label="بخش‌های پروژهٔ گیک‌بازی">
        {TABS.map((item) => (
          <button
            key={item.id}
            role="tab"
            type="button"
            aria-selected={tab === item.id}
            className={tab === item.id ? 'is-active' : undefined}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'scenes' && (
        <div className="scenes">
          <ul className="scenes__list">
            {project.scenes.map((item, index) => (
              <li key={item.title}>
                <button
                  type="button"
                  className={index === scene ? 'is-active' : undefined}
                  onMouseEnter={() => setScene(index)}
                  onFocus={() => setScene(index)}
                  onClick={() => setScene(index)}
                >
                  <T>{item.title}</T>
                </button>
              </li>
            ))}
          </ul>
          <article className="scenes__detail" key={active.title}>
            <span className="scenes__format">{active.format}</span>
            <p className="scenes__hook">«<T>{active.hook}</T>»</p>
            <p className="scenes__beat"><T>{active.beat}</T></p>
            <EvidenceLinks forKey={`scene-${scene + 1}`} />
          </article>
        </div>
      )}

      {tab === 'video' && (
        <div className="videos">
          {project.videos.map((video) => (
            <figure key={video.src}>
              <video src={video.src} poster={video.poster} controls preload="none" playsInline />
              <figcaption>
                <b><T>{video.title}</T></b>
                <span><T>{video.note}</T></span>
              </figcaption>
              <EvidenceLinks forKey="video-dead-of-winter" compact />
            </figure>
          ))}
        </div>
      )}

      {tab === 'aparat' && (
        <div className="aparats">
          {project.aparat.map((video) => (
            <AparatEmbed key={video.hash} video={video} />
          ))}
        </div>
      )}

      {tab === 'boardgame' && project.boardGame && (
        <div className="boardgame">
          <div className="boardgame__head">
            <h4>{project.boardGame.name}</h4>
            <span className="boardgame__slogan">«<T>{project.boardGame.slogan}</T>»</span>
          </div>
          <p className="boardgame__text"><T>{project.boardGame.about}</T></p>
          <p className="boardgame__text"><T>{project.boardGame.name_note}</T></p>
          <ul className="boardgame__credits">
            {project.boardGame.credits.map((c) => (
              <li key={c.name}><b>{c.name}</b><span><T>{c.role}</T></span></li>
            ))}
          </ul>
          {project.boardGame.image && (
            <figure className="boardgame__shot">
              <img src={project.boardGame.image} alt={project.boardGame.imageAlt} width="640" height="645" loading="lazy" decoding="async" />
              <figcaption><T>{project.boardGame.imageCaption}</T></figcaption>
            </figure>
          )}
          {project.boardGame.rulebook && (
            <p className="world-note"><T>{project.boardGame.rulebook}</T></p>
          )}
          {project.boardGame.rulebookDoc && (
            <p>
              <a
                className="evidence__link evidence__link--doc is-playable"
                href={docUrl(project.boardGame.rulebookDoc)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span aria-hidden="true">۞</span>
                دفترچهٔ قانون عشق عددی
              </a>
            </p>
          )}
        </div>
      )}

      {tab === 'proof' && (
        <div className="proof">
          {project.proof.map((item, index) => (
            <figure key={item.src}>
              <img src={item.src} alt={`اسکرین‌شات اینستاگرام: ${item.title}`} width="620" height="1286" loading="lazy" decoding="async" />
              <figcaption>
                <b><T>{item.title}</T></b>
                <span><T>{item.stats}</T></span>
              </figcaption>
              <EvidenceLinks forKey={['proof-clash', 'proof-hoseleton'][index]} compact />
            </figure>
          ))}
        </div>
      )}

      {tab === 'library' && (
        <div className="library">
          <ul className="library__counts">
            {project.library.map((item) => (
              <li key={item.label}>
                <b>{item.count}</b>
                <span>{item.label}</span>
                <small><T>{item.sample}</T></small>
              </li>
            ))}
          </ul>
          <div className="library__grid">
            {project.grid.map((src) => (
              <img key={src} src={src} alt="نمایی از پست‌های صفحهٔ اینستاگرام گیک‌بازی" width="720" height="1506" loading="lazy" decoding="async" />
            ))}
          </div>
          <p className="world-note">{project.gridNote}</p>

          <div className="rulebooks">
            <h5>دفترچه‌های قانون</h5>
            <p className="playhint playhint--inline">هر دفترچه یه فایل واقعیه؛ بازش کنید و بخونید.</p>
            <ul className="rulebooks__list">
              {rulebooks.map((book) => (
                <li key={book.slug}>
                  <a className="is-playable" href={docUrl(book.slug)} target="_blank" rel="noopener noreferrer">
                    <span aria-hidden="true">۞</span>
                    <T>{book.title}</T>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <WritingArchive />
        </div>
      )}

      {tab === 'campaigns' && (
        <ul className="campaigns">
          {project.campaigns.map((item, index) => (
            <li key={item.title}>
              <b>{item.title}</b>
              <p><T>{item.text}</T></p>
              {index === 0 && <EvidenceLinks forKey="campaign-joftshish" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
