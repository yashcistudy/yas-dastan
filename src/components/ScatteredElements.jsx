import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { fragments, fragmentGroups, hero } from '../data/content.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import { useMediaQuery } from '../hooks/useMediaQuery.js'
import { toPersianDigits } from '../utils/format.js'
import './ScatteredElements.css'
import T from '../utils/Bidi.jsx'

/**
 * The core interaction.
 *
 * Real pieces of Yas's work start scattered on the desk. Moving the pointer
 * across a piece "sweeps" it into its group, and the groups build a small
 * system in front of the visitor: idea, story, structure, result.
 *
 * The animation is not decoration: organising the desk is the claim the
 * portfolio makes about how Yas works, performed instead of described.
 *
 * Placement is measured, not guessed. The old version put the cards on a
 * jittered percentage grid, so on every width some cards landed on the
 * illustration, on the sky diamond, on the chapter rail or under the HUD, and
 * cards in the same row overlapped each other. Now the component measures the
 * board and the things the cards must stay clear of, then packs the cards into
 * free cells. Phones get a paper tray that scrolls, so all fourteen cards are
 * reachable there too.
 */

/** Deterministic pseudo random in [0,1) so the layout is stable between renders. */
function seeded(seed) {
  const x = Math.sin(seed * 9973.13) * 10000
  return x - Math.floor(x)
}

/** Things a card must never cover. */
const OBSTACLES = [
  '.hero__copy',
  '.hero__illustration img',
  '.hero__scroll',
  '.desk__hud',
  '.rail',
  '.brand-frame__paper'
]

const GAP = 12
const PAD = 10

function overlaps(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
}

/**
 * Place the cards on the free parts of the desk.
 *
 * A fixed grid wasted the narrow strips beside the illustration, so this walks
 * candidate positions on a fine step, keeps the ones clear of every obstacle,
 * shuffles them with a stable seed so the result still looks scattered by hand,
 * then accepts a position only when it also clears the cards already placed.
 */
function packSlots(board, blocked, cardW, cardH, needed, gap, pad, tilted = true) {
  const STEP = 8
  // A card is tilted, so what the visitor actually sees is bigger than the
  // layout box: a nine degree tilt pushes the painted corners out by roughly
  // eight per cent of the other side. The obstacle test uses that painted box,
  // otherwise a corner of a card creeps over the headline or the illustration.
  const tiltX = tilted ? cardH * 0.09 + 2 : 0
  const tiltY = tilted ? cardW * 0.09 + 2 : 0
  const walls = blocked.map((rect) => ({
    x: rect.x - pad,
    y: rect.y - pad,
    w: rect.w + pad * 2,
    h: rect.h + pad * 2
  }))
  const candidates = []
  for (let y = 0; y + cardH <= board.h; y += STEP) {
    for (let x = 0; x + cardW <= board.w; x += STEP) {
      const box = { x, y, w: cardW, h: cardH }
      const painted = { x: x - tiltX, y: y - tiltY, w: cardW + tiltX * 2, h: cardH + tiltY * 2 }
      if (walls.some((rect) => overlaps(painted, rect))) continue
      candidates.push(box)
    }
  }
  candidates.sort((a, b) => seeded(a.x * 31 + a.y * 7) - seeded(b.x * 31 + b.y * 7))
  const placed = []
  for (const box of candidates) {
    const padded = { x: box.x - gap, y: box.y - gap, w: cardW + gap * 2, h: cardH + gap * 2 }
    if (placed.some((done) => overlaps(padded, done))) continue
    placed.push(box)
    if (placed.length === needed) break
  }
  return { placed, candidates }
}

/**
 * Last resort, used only on the narrow laptop widths where no card size lets
 * all fourteen keep their distance. Cards are allowed to lean on each other
 * the way loose paper does, but never by more than a third of a card, so every
 * piece stays readable and clickable. Anything is better than the old
 * behaviour, which gave up and stacked all fourteen in one corner.
 */
function relax(candidates, needed, cardW, cardH) {
  const budget = cardW * cardH * 0.32
  const placed = []
  for (const box of candidates) {
    const tooMuch = placed.some((done) => {
      const ix = Math.min(box.x + cardW, done.x + cardW) - Math.max(box.x, done.x)
      const iy = Math.min(box.y + cardH, done.y + cardH) - Math.max(box.y, done.y)
      return ix > 0 && iy > 0 && ix * iy > budget
    })
    if (tooMuch) continue
    placed.push(box)
    if (placed.length === needed) break
  }
  return placed
}

export default function ScatteredElements({ onProgress }) {
  const boardRef = useRef(null)
  const [sorted, setSorted] = useState(() => new Set())
  const [layout, setLayout] = useState(null)
  const reducedMotion = useReducedMotion()
  // Below this width the hero has no room for fourteen loose cards without
  // something landing on the copy or the illustration, so the desk becomes a
  // paper tray that scrolls sideways instead.
  const narrow = useMediaQuery('(max-width: 1199px)')

  // Every width shows the whole desk: all fourteen pieces of work.
  const scattered = useMemo(
    () => fragments.map((fragment, index) => ({ ...fragment, rotate: -9 + seeded(index + 21) * 18 })),
    []
  )

  const total = scattered.length
  const done = sorted.size

  useEffect(() => {
    onProgress?.(done, total)
  }, [done, total, onProgress])

  /**
   * Measure the board and the obstacles, then place the cards.
   * The tray layout on phones is plain flow, so it needs no measuring.
   */
  const measure = useCallback(() => {
    const board = boardRef.current
    if (!board || narrow) {
      setLayout(null)
      return
    }
    const bounds = board.getBoundingClientRect()
    if (bounds.width < 320) {
      setLayout(null)
      return
    }
    const rtl = getComputedStyle(board).direction === 'rtl'
    const blocked = OBSTACLES.flatMap((selector) =>
      [...document.querySelectorAll(selector)].map((node) => {
        const rect = node.getBoundingClientRect()
        return {
          x: rect.left - bounds.left,
          y: rect.top - bounds.top,
          w: rect.width,
          h: rect.height
        }
      })
    ).filter((rect) => rect.w > 0 && rect.h > 0)
    // Keep the very top strip free for the group labels that fade in on sorting.
    blocked.push({ x: 0, y: 0, w: bounds.width, h: 46 })

    // Cards are rotated, so their painted box is bigger than their layout box.
    // A card tilted by nine degrees hangs over its box by about 8% of its
    // height sideways and 8% of its width up and down, so the inset is not
    // square: a generous square margin threw away the narrow columns beside
    // the illustration and left half the desk unusable.
    const MARGIN_X = 12
    const MARGIN_Y = 22
    const area = { w: bounds.width - MARGIN_X * 2, h: bounds.height - MARGIN_Y * 2 }
    const shifted = blocked.map((rect) => ({
      ...rect,
      x: rect.x - MARGIN_X,
      y: rect.y - MARGIN_Y
    }))

    // Shrink the card box, and then the breathing room around it, step by step
    // until all fourteen cards own their own cell. On a 1200 to 1400 wide
    // laptop the old ladder ran out after eight or ten cards, the component
    // decided the desk was unplayable and dropped every card at the corner.
    // Card width, card height, room between cards, room around the obstacles.
    // Narrow laptops need the last rows: there the cards get smaller so all
    // fourteen still keep their own cell.
    const steps = [
      [Math.min(196, Math.max(150, bounds.width * 0.145)), 92, 12, PAD],
      [176, 90, 12, PAD],
      [160, 86, 10, PAD],
      [148, 84, 9, PAD],
      [136, 80, 8, PAD],
      [128, 78, 7, PAD],
      [120, 74, 6, PAD],
      [112, 72, 5, PAD],
      [104, 70, 4, PAD]
    ]
    let cardW = steps[0][0]
    let cardH = steps[0][1]
    let cells = []
    let pool = []
    for (const [w, h, gap, pad] of steps) {
      const { placed, candidates } = packSlots(area, shifted, w, h, total, gap, pad)
      cardW = w
      cardH = h
      cells = placed
      pool = candidates
      if (placed.length >= total) break
    }
    if (cells.length < total) cells = relax(pool, total, cardW, cardH)
    if (cells.length < total) {
      setLayout(null)
      return
    }
    const place = (box) => ({
      start: (rtl ? area.w - (box.x + cardW) : box.x) + MARGIN_X,
      top: box.y + MARGIN_Y
    })
    const scatterSlots = new Map()
    scattered.forEach((fragment, index) => {
      const box = cells[index]
      if (box) scatterSlots.set(fragment.id, place(box))
    })
    // Sorted cards line up in group piles. They reuse the very same measured
    // cells the scattered cards came from, only reordered, so the tidy desk is
    // guaranteed to be free of collisions as well. The earlier version handed
    // out cells with a modulo, which quietly gave the same cell to several
    // cards: the desk looked messier after tidying than before it.
    // A sorted card lies straight, so it takes less room than a tilted one and
    // a second, tilt free pass can find cleaner cells.
    const straight = packSlots(area, shifted, cardW, cardH, total, 5, PAD, false).placed
    const tidyCells = straight.length >= total ? straight : cells

    // Tidying has to look tidy. The cells are sorted across the desk and then
    // handed out in one unbroken run per group, so each group ends up in its
    // own zone instead of staying sprinkled about, and its label is parked over
    // that zone rather than on a fixed grid that lined up with nothing.
    // Reading order is right to left, which in this measured space means
    // descending x, so the first group sits where a Persian reader starts.
    const ordered = [...tidyCells].sort((a, b) => b.x - a.x || a.y - b.y)
    const tidySlots = new Map()
    const groupSlots = new Map()
    let cursor = 0
    fragmentGroups.forEach((group) => {
      const inGroup = scattered.filter((item) => item.group === group.id)
      const zone = ordered.slice(cursor, cursor + inGroup.length).sort((a, b) => a.y - b.y || b.x - a.x)
      cursor += inGroup.length
      inGroup.forEach((item, itemIndex) => {
        const box = zone[itemIndex]
        if (box) tidySlots.set(item.id, place(box))
      })
      if (zone.length) {
        const top = Math.min(...zone.map((box) => box.y))
        const middle = zone.reduce((sum, box) => sum + box.x, 0) / zone.length
        groupSlots.set(group.id, place({ x: middle, y: Math.max(0, top - 26) }))
      }
    })

    // Keep the clamp in step with the card height, so the last visible line
    // is never sliced through the middle of the letters.
    const lines = Math.max(2, Math.floor((cardH - 20) / 24))
    setLayout({ cardW, cardH, lines, scatterSlots, tidySlots, groupSlots })
  }, [narrow, scattered, total])

  useLayoutEffect(() => {
    measure()
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    const frame = requestAnimationFrame(measure)
    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(frame)
    }
  }, [measure])

  const sort = useCallback((id) => {
    setSorted((previous) => {
      if (previous.has(id)) return previous
      const next = new Set(previous)
      next.add(id)
      return next
    })
  }, [])

  /** Pointer sweeping: anything close to the pointer finds its place. */
  const handlePointerMove = useCallback(
    (event) => {
      const board = boardRef.current
      if (!board) return
      const bounds = board.getBoundingClientRect()
      const pointerX = event.clientX
      const pointerY = event.clientY
      board.querySelectorAll('[data-fragment]').forEach((node) => {
        const id = node.dataset.fragment
        if (sorted.has(id)) return
        const rect = node.getBoundingClientRect()
        // Distance to the card edge, not its centre. Wide and rotated cards
        // used to be unreachable because their centre stayed far away even
        // when the pointer was right on top of the card.
        const dx = Math.max(rect.left - pointerX, 0, pointerX - rect.right)
        const dy = Math.max(rect.top - pointerY, 0, pointerY - rect.bottom)
        const distance = Math.hypot(dx, dy)
        if (distance < Math.max(44, bounds.width * 0.03)) sort(id)
      })
    },
    [sort, sorted]
  )

  const reset = () => setSorted(new Set())
  const sortAll = () => setSorted(new Set(scattered.map((item) => item.id)))
  const complete = done === total
  const compact = narrow
  // Only place cards loose on the desk when every card got its own measured
  // slot. Anything less and the tray layout keeps them readable.
  const positioned = Boolean(layout) && !narrow && layout.scatterSlots.size === total

  return (
    <div
      className={`desk${complete ? ' is-complete' : ''}${compact ? ' desk--tray' : ''}${
        positioned ? ' desk--placed' : ''
      }`}
      ref={boardRef}
      style={
        layout
          ? {
              '--note-w': `${layout.cardW}px`,
              '--note-h': `${layout.cardH}px`,
              '--note-lines': layout.lines
            }
          : undefined
      }
      data-placed={layout ? layout.scatterSlots.size : 0}
      onPointerMove={reducedMotion || compact ? undefined : handlePointerMove}
    >
      <div className={`desk__groups${positioned ? ' desk__groups--placed' : ''}`} aria-hidden="true">
        {fragmentGroups.map((group) => {
          const slot = positioned ? layout.groupSlots.get(group.id) : null
          return (
            <span
              key={group.id}
              className="desk__group-label"
              style={{
                color: group.color,
                ...(slot ? { '--x': `${slot.start}px`, '--y': `${slot.top}px` } : null)
              }}
            >
              {group.label}
            </span>
          )
        })}
      </div>

      <ul className="desk__list">
        {scattered.map((fragment) => {
          const isSorted = sorted.has(fragment.id)
          const place = positioned
            ? (isSorted ? layout.tidySlots.get(fragment.id) : layout.scatterSlots.get(fragment.id)) ||
              layout.scatterSlots.get(fragment.id)
            : null
          const groupColor = fragmentGroups.find((group) => group.id === fragment.group)?.color
          return (
            <li
              key={fragment.id}
              data-fragment={fragment.id}
              className={`note${isSorted ? ' is-sorted' : ''}`}
              style={{
                ...(place ? { '--x': `${place.start}px`, '--y': `${place.top}px` } : null),
                '--rotate': `${isSorted ? 0 : fragment.rotate}deg`,
                '--accent': groupColor
              }}
            >
              <button
                type="button"
                aria-label={`مرتب کردن: ${fragment.text}`}
                aria-pressed={isSorted}
                onClick={() => sort(fragment.id)}
                onPointerDown={() => sort(fragment.id)}
                onPointerEnter={() => sort(fragment.id)}
              >
                <span className="note__text"><T>{fragment.text}</T></span>
                <span className="note__source"><T>{fragment.source}</T></span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="desk__hud">
        <p className="playhint playhint--inline">می‌تونید همه ایده‌های روی میز رو مرتب کنید؟</p>
        <p className="desk__progress">
          <b>{toPersianDigits(done)}</b> از <b>{toPersianDigits(total)}</b> {hero.progressLabel}
        </p>
        <div className="desk__actions">
          {!complete && (
            <button type="button" className="desk__button" onClick={sortAll}>
              همه را مرتب کن
            </button>
          )}
          {done > 0 && (
            <button type="button" className="desk__button desk__button--ghost" onClick={reset}>
              {hero.resetLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
