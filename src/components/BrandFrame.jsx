/**
 * The drawn frame from the brand reference: two dark red corner rules and the
 * blue paper corner. Purely decorative, so it is hidden from assistive tech.
 */
export default function BrandFrame() {
  return (
    <div className="brand-frame" aria-hidden="true">
      <span className="brand-frame__corner brand-frame__corner--tr" />
      <span className="brand-frame__corner brand-frame__corner--bl" />
      <span className="brand-frame__paper" />
    </div>
  )
}
