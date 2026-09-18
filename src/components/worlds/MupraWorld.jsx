import { useState } from 'react'
import DocPreview from './DocPreview.jsx'
import EvidenceLinks from './EvidenceLinks.jsx'
import T from '../../utils/Bidi.jsx'

const TABS = [
  { id: 'wall', label: 'دیوار ریتیل‌شو' },
  { id: 'campaigns', label: 'کمپین‌ها' },
  { id: 'ux', label: 'UX رایتینگ' },
  { id: 'catalog', label: 'کتابچه و مقاله‌ها' }
]

/** Mupra: same tabbed structure as GeekBazi/Mehrayan. */
export default function MupraWorld({ project }) {
  const [tab, setTab] = useState('wall')
  const base = import.meta.env.BASE_URL

  return (
    <div className="world-body">
      <p className="playhint playhint--inline">چهار برچسب اینجاست؛ هرکدوم رو بزنید یه تکه از کار رو می‌بینید.</p>
      <div className="tabs is-playable" role="tablist" aria-label="بخش‌های پروژهٔ ماپرا">
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

      {tab === 'wall' && project.journeyWall && (
        <figure className="wall">
          <img
            src={`${base}assets/images/projects/mupra/${project.journeyWall.image}`}
            alt="دیوار سفر مشتری ماپرا در نمایشگاه ریتیل‌شو"
            width="1050"
            height="522"
            loading="lazy"
            decoding="async"
          />
          <figcaption><T>{project.journeyWall.caption}</T></figcaption>
        </figure>
      )}

      {tab === 'campaigns' && (
        <ul className="campaigns campaigns--grid">
          {project.campaignList.map((item) => (
            <li key={item.title}>
              <b><T>{item.title}</T></b>
              <em><T>{item.line}</T></em>
              <p><T>{item.text}</T></p>
            </li>
          ))}
        </ul>
      )}

      {tab === 'ux' && (
        <div className="ux">
          <h4>UX رایتینگ، دو نمونه</h4>
          {project.uxWriting.map((item) => (
            <div key={item.path} className="ux__item">
              <code>{item.path}</code>
              <p><b>مشکل: </b><T>{item.issue}</T></p>
              <p><b>پیشنهاد: </b><T>{item.fix}</T></p>
              {item.image && (
                <img
                  className="ux__shot"
                  src={`${base}assets/images/projects/mupra/${item.image}`}
                  alt={item.imageAlt || ''}
                  width="1400"
                  height="664"
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'catalog' && (
        <div className="toc">
          {project.documents && (
            <div className="docprevs">
              {project.documents.map((doc) => (
                <DocPreview key={doc.file} doc={doc} />
              ))}
            </div>
          )}

          <h4>ستون فقرات کتابچه</h4>
          <ol>
            {project.catalogToc.map((item) => (
              <li key={item}><T>{item}</T></li>
            ))}
          </ol>

          {project.seoArticles && (
            <div className="toc__seo">
              <h4>مقاله‌های سئوی ماپرا</h4>
              <p className="world-note"><T>{project.seoArticlesNote}</T></p>
              <ul>
                {project.seoArticles.map((item) => (
                  <li key={item}><T>{item}</T></li>
                ))}
              </ul>
            </div>
          )}

          {project.filesKey && <EvidenceLinks forKey={project.filesKey} />}
        </div>
      )}
    </div>
  )
}
