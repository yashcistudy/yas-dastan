import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
 */

/** Deterministic pseudo random in [0,1) so the layout is stable between renders. */
function seeded(seed) {
  const x = Math.sin(seed * 9973.13) * 10000
  return x - Math.floor(x)
}

/**
 * Fragments live in the left half of the hero on desktop, so the introduction
 * text on the right stays readable. They sit on a jittered grid instead of pure
 * randomness: a desk is messy, not unreadable.
 */
const DESKTOP_COLUMNS = 3
const PHONE_COLUMNS = 2

/** Phones get fewer notes in a tighter tray, so the introduction stays readable. */
function buildScatter(compact) {
  const source = compact ? fragments.slice(0, 8) : fragments
  const columns = compact ? PHONE_COLUMNS : DESKTOP_COLUMNS
  return source.map((fragment, index) => {
    const column = index % columns
    const row = Math.floor(index / columns)
    return {
      ...fragment,
      x: compact ? 5 + column * 47 + seeded(index + 1) * 2 : 3 + column * 10 + seeded(index + 1) * 4,
      y: compact ? 2 + row * 7 + seeded(index + 11) * 3 : 4 + row * 15 + seeded(index + 11) * 5,
      rotate: -11 + seeded(index + 21) * 22
    }
  })
}

export default function ScatteredElements({ onProgress }) {
  const boardRef = useRef(null)
  const [sorted, setSorted] = useState(() => new Set())
  const reducedMotion = useReducedMotion()
  const compact = useMediaQuery('(max-width: 900px)')
  const scattered = useMemo(() => buildScatter(compact), [compact])

  const total = scattered.length
  const done = sorted.size

  useEffect(() => {
    onProgress?.(done, total)
  }, [done, total, onProgress])

  /** Slot each organised fragment gets inside its group column. */
  const slots = useMemo(() => {
    const map = new Map()
    if (compact) {
      scattered.forEach((item, index) => {
        map.set(item.id, { x: 5 + (index % 2) * 47, y: 2 + Math.floor(index / 2) * 7, rotate: 0 })
      })
      return map
    }
    fragmentGroups.forEach((group, groupIndex) => {
      const inGroup = scattered.filter((item) => item.group === group.id)
      inGroup.forEach((item, itemIndex) => {
        map.set(item.id, {
          x: 6 + groupIndex * 15,
          y: 14 + itemIndex * 13,
          rotate: 0
        })
      })
    })
    return map
  }, [compact, scattered])

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

  return (
    <div
      className={`desk${complete ? ' is-complete' : ''}`}
      ref={boardRef}
      onPointerMove={reducedMotion ? undefined : handlePointerMove}
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
          const place = isSorted ? slots.get(fragment.id) : fragment
          const groupColor = fragmentGroups.find((group) => group.id === fragment.group)?.color
          return (
            <li
              key={fragment.id}
              data-fragment={fragment.id}
              className={`note${isSorted ? ' is-sorted' : ''}`}
              style={{
                '--x': `${place.x}%`,
                '--y': `${place.y}%`,
                '--rotate': `${place.rotate}deg`,
                '--accent': groupColor
              }}
            >
              <button
                type="button"
                aria-label={`مرتب کردن: ${fragment.text}`}
                onClick={() => sort(fragment.id)}
                onPointerDown={() => sort(fragment.id)}
                onPointerEnter={() => sort(fragment.id)}
                onFocus={() => sort(fragment.id)}
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
