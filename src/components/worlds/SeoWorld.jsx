import { useState } from 'react'
import T from '../../utils/Bidi.jsx'

/** MeliPayamak: ranks are the whole story, so a mock Google search makes the numbers legible as ranks. */
export default function SeoWorld({ project }) {
  const [active, setActive] = useState(project.articles[0])

  return (
    <div className="world-body">
      <div className="seo__search" role="group" aria-label="شبیه‌سازی جست‌وجوی گوگل">
        <span className="seo__search-icon" aria-hidden="true">🔍</span>
        <span className="seo__search-query ltr-edge" lang="fa"><T>{active.keyword}</T></span>
        <span className="seo__search-result">
          نتیجه: رتبهٔ <b>{active.rank}</b> در گوگل
        </span>
      </div>

      <ul className="seo">
        {project.articles.map((item) => (
          <li key={item.title}>
            <button
              type="button"
              className={`seo__row${item === active ? ' is-active' : ''}`}
              onClick={() => setActive(item)}
            >
              <span className={`seo__rank${item.rank === '۱' ? ' is-first' : ''}`}>{item.rank}</span>
              <span>
                <b><T>{item.title}</T></b>
                <span className="seo__meta">
                  کلیدواژه: <T>{item.keyword}</T> · نیت جست‌وجو: {item.intent}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="world-note">
        هر عدد، رتبهٔ همان مقاله برای همان کلیدواژه در نتایج گوگل است؛ روی هر ردیف بزن تا در نوار بالا ببینی.
        رتبه‌ها از گزارش «مقاله‌های منتشرشده + رنک». نویسنده: یاسمین دستان‌زاده.
      </p>
    </div>
  )
}
