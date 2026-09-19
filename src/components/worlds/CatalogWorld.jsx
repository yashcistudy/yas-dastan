import { useState } from 'react'
import FigmaPrototype from './FigmaPrototype.jsx'
import ChainReaction from './ChainReaction.jsx'
import T from '../../utils/Bidi.jsx'

const TABS = [
  { id: 'homepage', label: 'طراحی صفحه اول' },
  { id: 'gamification', label: 'مستند سیستم گیمیفیکیشن' },
  { id: 'video', label: 'تیزر' }
]

/** Mehrayan: same tabbed structure as GeekBazi, with the homepage case and gamification leading. */
export default function CatalogWorld({ project }) {
  const [tab, setTab] = useState('homepage')

  return (
    <div className="world-body">
      <p className="playhint playhint--inline">سه برچسب اینجاست؛ هرکدوم رو بزنید یه تکه از کار رو می‌بینید.</p>
      <div className="tabs is-playable" role="tablist" aria-label="بخش‌های پروژه مهرایان">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={tab === t.id ? 'is-active' : undefined}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'homepage' && project.homepageCase && (
        <div className="homepage-case">
          <p className="homepage-case__text"><T>{project.homepageCase.problem}</T></p>
          <p className="homepage-case__text"><T>{project.homepageCase.styleNote}</T></p>
          <p className="world-note"><T>{project.homepageCase.link}</T></p>
          <FigmaPrototype prototype={project.prototype} />
        </div>
      )}

      {tab === 'gamification' && project.gamification && (
        <div className="gamification-note">
          {project.gamification.title && <h4 className="gamification-note__title"><T>{project.gamification.title}</T></h4>}
          <p className="homepage-case__text"><T>{project.gamification.note}</T></p>
          {project.gamification.checklist && (
            <ul className="doclist">
              {project.gamification.checklist.map((item) => (
                <li key={item}><T>{item}</T></li>
              ))}
            </ul>
          )}
          {project.gamification.stages && (
            <ol className="stage-row">
              {project.gamification.stages.map((s) => (
                <li key={s.n}>
                  <span className="stage-row__n">{s.n}</span>
                  <b><T>{s.title}</T></b>
                  <span><T>{s.text}</T></span>
                </li>
              ))}
            </ol>
          )}
          {project.gamification.docNote && <p className="playhint playhint--inline"><T>{project.gamification.docNote}</T></p>}
          <a className="btn btn--outline is-playable" href="#project-kadec">{project.gamification.cta}</a>
        </div>
      )}

      {tab === 'video' && project.chain && <ChainReaction chain={project.chain} />}
    </div>
  )
}
