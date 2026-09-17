import { projects } from '../data/projects.js'
import { useInView } from '../hooks/useInView.js'
import ProjectWorld from './ProjectWorld.jsx'
import './ProjectWorlds.css'

/** Chapter three: five worlds, each entered on its own terms. */
export default function ProjectWorlds() {
  const [ref, inView] = useInView()

  return (
    <section className="section projects" id="projects" ref={ref}>
      <div className={`projects__head reveal${inView ? ' is-in' : ''}`}>
        <span className="section__kicker">فصل سوم</span>
        <h2 className="section__title">پروژه‌ها</h2>
        <p className="section__lead">
          هر پروژه یک دنیای جداست. برای همین به‌جای کارت و اسکرین‌شات، هر کدام همان‌طور نشان داده می‌شود
          که ساخته شده: سناریو، کاتالوگ، پروتوتایپ یا داده.
        </p>
      </div>

      <div className="projects__list">
        {projects.map((project, index) => (
          <ProjectWorld key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
