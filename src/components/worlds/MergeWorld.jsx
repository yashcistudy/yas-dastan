import { useInView } from '../../hooks/useInView.js'
import T from '../../utils/Bidi.jsx'
import AparatEmbed from './AparatEmbed.jsx'

/** Kadec: the scenario merges groups step by step, so the artifact merges too. */
export default function MergeWorld({ project }) {
  const [ref, inView] = useInView({ threshold: 0.35 })

  return (
    <div className="world-body" ref={ref}>
      {project.note && (
        <p className="merge__note"><T>{project.note}</T></p>
      )}
      <div className={`merge${inView ? ' is-in' : ''}`}>
        {project.stages.map((stage, index) => (
          <div className="merge__stage" key={stage.label} style={{ transitionDelay: `${index * 320}ms` }}>
            <div className="merge__dots" data-stage={index}>
              {Array.from({ length: 6 }).map((_, dot) => (
                <span key={dot} />
              ))}
            </div>
            <b>{stage.label}</b>
            <span><T>{stage.text}</T></span>
          </div>
        ))}
      </div>

      <div className="observations">
        <h4>چیزی که منابع انسانی می‌بیند</h4>
        <ul>
          {project.observations.map((item) => (
            <li key={item}><T>{item}</T></li>
          ))}
        </ul>
      </div>

      {project.aparat?.map((video) => (
        <AparatEmbed key={video.hash} video={video} />
      ))}
    </div>
  )
}
