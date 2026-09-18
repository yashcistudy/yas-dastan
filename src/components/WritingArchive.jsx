import { useState } from 'react'
import { docUrl, writingGroups, archiveCount } from '../data/writing.js'
import T from '../utils/Bidi.jsx'
import './WritingArchive.css'

/**
 * The archive behind the portfolio: reel scenarios, long video scripts, blog
 * articles, rulebooks and briefs. The strips scroll sideways so the archive
 * stays browsable instead of becoming a wall of links.
 */
export default function WritingArchive() {
  const [group, setGroup] = useState(writingGroups[0]?.id)
  const active = writingGroups.find((item) => item.id === group) || writingGroups[0]
  if (!active) return null

  return (
    <section className="archive" aria-label="آرشیو نوشته‌ها">
      <header className="archive__head">
        <h5>آرشیو نوشتن</h5>
        <p className="playhint playhint--inline">روی هر فایل بزنید تا نوشتهٔ اصلیش باز بشه.</p>
        <p className="archive__count">{archiveCount} فایل از نوشته‌های خودم، همه قابل باز شدن.</p>
      </header>

      <div className="tabs tabs--sm is-playable" role="tablist" aria-label="دسته‌های آرشیو">
        {writingGroups.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === active.id}
            className={item.id === active.id ? 'is-active' : undefined}
            onClick={() => setGroup(item.id)}
          >
            {item.label}
            <small>{item.items.length}</small>
          </button>
        ))}
      </div>

      <p className="archive__note"><T>{active.note}</T></p>

      <ul className="archive__strip">
        {active.items.map((item) => (
          <li key={item.slug}>
            <a href={docUrl(item.slug)} target="_blank" rel="noopener noreferrer" className="is-playable">
              <span className="archive__icon" aria-hidden="true">۞</span>
              <span className="archive__title">{item.title}</span>
              <span className="archive__open">باز کن</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
