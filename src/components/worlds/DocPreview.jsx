import T from '../../utils/Bidi.jsx'

/**
 * A finished document, shown rather than linked.
 *
 * A line of text saying a booklet exists is not the same as seeing its cover.
 * Each card shows the real first page, then offers the two things a visitor
 * actually wants: open it, or keep it.
 */
export default function DocPreview({ doc }) {
  const base = import.meta.env.BASE_URL
  const file = `${base}assets/docs/mupra/${doc.file}`

  return (
    <figure className="docprev">
      <a
        className="docprev__sheet is-playable"
        href={file}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`باز کردن ${doc.title}`}
      >
        <img
          src={`${base}assets/images/projects/mupra/${doc.preview}`}
          alt={doc.previewAlt}
          width={doc.previewWidth}
          height={doc.previewHeight}
          loading="lazy"
          decoding="async"
        />
      </a>
      <figcaption>
        <b><T>{doc.title}</T></b>
        <span><T>{doc.note}</T></span>
        <span className="docprev__meta">{doc.meta}</span>
        <span className="docprev__actions">
          <a className="btn btn--solid is-playable" href={file} target="_blank" rel="noopener noreferrer">
            دیدن
          </a>
          <a className="btn btn--outline is-playable" href={file} download>
            دانلود PDF
          </a>
        </span>
      </figcaption>
    </figure>
  )
}
