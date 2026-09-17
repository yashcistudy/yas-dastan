import { chapters } from './data/content.js'
import { useActiveChapter } from './hooks/useActiveChapter.js'
import ChapterRail from './components/ChapterRail.jsx'
import HeroDesk from './components/HeroDesk.jsx'
import StorySection from './components/StorySection.jsx'
import ProjectWorlds from './components/ProjectWorlds.jsx'
import ProcessAnimation from './components/ProcessAnimation.jsx'
import ContactSection from './components/ContactSection.jsx'

const ids = chapters.map((chapter) => chapter.id)

export default function App() {
  const active = useActiveChapter(ids)

  return (
    <>
      <a className="skip-link" href="#about">
        رفتن به محتوای اصلی
      </a>
      <ChapterRail chapters={chapters} active={active} />
      <main>
        <HeroDesk />
        <StorySection />
        <ProjectWorlds />
        <ProcessAnimation />
        <ContactSection />
      </main>
    </>
  )
}
