import { about } from '../data/content.js'
import { useInView } from '../hooks/useInView.js'
import AboutGame from './AboutGame.jsx'
import './StorySection.css'
import T from '../utils/Bidi.jsx'

/** Chapter two: not a biography, a way of thinking. */
export default function StorySection() {
  const [ref, inView] = useInView()
  const portrait = `${import.meta.env.BASE_URL}assets/images/people/yas-portrait.jpg`

  return (
    <section className="section story" id="about" ref={ref}>
      <div className={`story__head reveal${inView ? ' is-in' : ''}`}>
        <span className="section__kicker">{about.kicker}</span>
        <h2 className="section__title">{about.title}</h2>
        <p className="section__lead">{about.lead}</p>
      </div>

      <div className="story__body">
        <div className={`story__text reveal${inView ? ' is-in' : ''}`}>
          {about.story.map((paragraph) => (
            <p key={paragraph}><T>{paragraph}</T></p>
          ))}
          <ul className="story__skills">
            {about.skills.map((skill) => (
              <li key={skill}><T>{skill}</T></li>
            ))}
          </ul>
        </div>

        <figure className={`story__portrait reveal${inView ? ' is-in' : ''}`}>
          <img src={portrait} alt="یاس دستان" loading="lazy" />
        </figure>
      </div>

      <div className={`reveal${inView ? ' is-in' : ''}`}>
        <AboutGame />
      </div>
    </section>
  )
}
