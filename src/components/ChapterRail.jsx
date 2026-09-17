import './ChapterRail.css'

/** Chapter navigation. Scroll feels like moving between chapters, so the rail names them. */
export default function ChapterRail({ chapters, active }) {
  return (
    <nav className="rail" aria-label="فصل‌های این تجربه">
      <ul>
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              className={active === chapter.id ? 'is-active' : undefined}
              aria-current={active === chapter.id ? 'true' : undefined}
            >
              <span className="rail__dot" aria-hidden="true" />
              <span className="rail__label">{chapter.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
