import { useEffect, useState } from 'react'

/** Tracks which chapter section is currently closest to the top of the screen. */
export function useActiveChapter(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const onScroll = () => {
      const marker = window.innerHeight * 0.35
      let current = ids[0]
      ids.forEach((id) => {
        const node = document.getElementById(id)
        if (node && node.getBoundingClientRect().top <= marker) current = id
      })
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])

  return active
}
