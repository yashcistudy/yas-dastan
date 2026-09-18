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
function packSlots(board, blocked, cardW, cardH, needed) {
  const STEP = 12
  const candidates = []
  for (let y = 0; y + cardH <= board.h; y += STEP) {
    for (let x = 0; x + cardW <= board.w; x += STEP) {
      const box = { x, y, w: cardW, h: cardH }
      if (blocked.some((rect) => overlaps(box, rect))) continue
      candidates.push(box)
    }
  }
  candidates.sort((a, b) => seeded(a.x * 31 + a.y * 7) - seeded(b.x * 31 + b.y * 7))
  const placed = []
  for (const box of candidates) {
    const padded = { x: box.x - GAP, y: box.y - GAP, w: cardW + GAP * 2, h: cardH + GAP * 2 }
    if (placed.some((done) => overlaps(padded, done))) continue
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
          x: rect.left - bounds.left - PAD,
          y: rect.top - bounds.top - PAD,
          w: rect.width + PAD * 2,
          h: rect.height + PAD * 2
        }
      })
    ).filter((rect) => rect.w > 0 && rect.h > 0)
    // Keep the very top strip free for the group labels that fade in on sorting.
    blocked.push({ x: 0, y: 0, w: bounds.width, h: 46 })

    // Cards are rotated, so their painted box is wider than their layout box.
    // Insetting the usable area keeps a tilted card from hanging off the desk.
    const ROTATION_MARGIN = 26
    const area = { w: bounds.width - ROTATION_MARGIN * 2, h: bounds.height - ROTATION_MARGIN * 2 }
    const shifted = blocked.map((rect) => ({
      ...rect,
      x: rect.x - ROTATION_MARGIN,
      y: rect.y - ROTATION_MARGIN
    }))

    // Shrink the card box step by step until every card owns its own cell,
    // instead of letting two cards share one slot.
    const sizes = [
      [Math.min(196, Math.max(150, bounds.width * 0.145)), 92],
      [168, 88],
      [150, 84],
      [136, 80],
      [124, 76]
    ]
    let cardW = sizes[0][0]
    let cardH = sizes[0][1]
    let cells = []
    for (const [w, h] of sizes) {
      const candidate = packSlots(area, shifted, w, h, total)
      cardW = w
      cardH = h
      cells = candidate
      if (candidate.length >= total) break
    }
    if (!cells.length) {
      setLayout(null)
      return
    }
    const place = (box) => ({
      start: (rtl ? area.w - (box.x + cardW) : box.x) + ROTATION_MARGIN,
      top: box.y + ROTATION_MARGIN
    })
    const scatterSlots = new Map()
    scattered.forEach((fragment, index) => {
      const box = cells[index]
      if (box) scatterSlots.set(fragment.id, place(box))
    })
    // Sorted cards line up in group columns inside the same free region.
    const byColumn = new Map()
    cells.forEach((box) => {
      const key = Math.round(box.x)
      if (!byColumn.has(key)) byColumn.set(key, [])
      byColumn.get(key).push(box)
    })
    const columns = [...byColumn.keys()].sort((a, b) => a - b).map((key) => byColumn.get(key))
    const tidySlots = new Map()
    fragmentGroups.forEach((group, groupIndex) => {
      const column = columns[groupIndex % Math.max(1, columns.length)] || []
      const inGroup = scattered.filter((item) => item.group === group.id)
      inGroup.forEach((item, itemIndex) => {
        const box = column[itemIndex % Math.max(1, column.length)]
        if (box) tidySlots.set(item.id, place(box))
      })
    })
    setLayout({ cardW, cardH, scatterSlots, tidySlots })
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
      style={layout ? { '--note-w': `${layout.cardW}px`, '--note-h': `${layout.cardH}px` } : undefined}
      data-placed={layout ? layout.scatterSlots.size : 0}
      onPointerMove={reducedMotion || compact ? undefined : handlePointerMove}
    >
      <div className="desk__groups" aria-hidden="true">
        {fragmentGroups.map((group) => (
          <span key={group.id} className="desk__group-label" style={{ color: group.color }}>
            {group.label}
          </span>
        ))}
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
        <p className="playhint playhint--inline">می‌تونید همۀ ایده‌های روی میز رو مرتب کنید؟</p>
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
