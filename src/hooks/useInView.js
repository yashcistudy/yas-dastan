import { useEffect, useRef, useState } from 'react'

/**
 * Reveals an element once it enters the viewport.
 *
 * The threshold is a ratio, so a section taller than the screen could never
 * reach a large ratio and would stay hidden. A zero threshold plus a small
 * bottom margin reveals as soon as the section really starts, at any height.
 */
export function useInView({ threshold = 0, rootMargin = '0px 0px -12% 0px', once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}
