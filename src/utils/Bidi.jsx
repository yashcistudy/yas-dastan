/**
 * Bidi-safe text.
 *
 * The whole experience is RTL Persian, but many real titles contain Latin runs
 * (product names, Figma, NFC, B2B, hashes). Neutral characters between a
 * Persian run and a Latin run can flip to the wrong side, so every Latin run is
 * isolated with <bdi>. Persian digits are left untouched on purpose.
 */
const SPLIT = /([A-Za-z][A-Za-z0-9&'’+./:_-]*(?:\s+[A-Za-z0-9&'’+./:_-]+)*)/g
const HAS_LATIN = /[A-Za-z]/

export default function T({ children }) {
  if (typeof children !== 'string') return children
  return children.split(SPLIT).map((part, index) =>
    HAS_LATIN.test(part) ? (
      <bdi key={`${part}-${index}`} className="ltr">
        {part}
      </bdi>
    ) : (
      part
    )
  )
}
