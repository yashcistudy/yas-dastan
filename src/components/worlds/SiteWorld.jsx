import AparatEmbed from './AparatEmbed.jsx'
import T from '../../utils/Bidi.jsx'
/** A site Yas designed, wrote and shipped. The quotes are from the live page. */
export default function SiteWorld({ project }) {
  const shot = `${import.meta.env.BASE_URL}assets/images/proof/omid-site.jpg`
  const mini = `${import.meta.env.BASE_URL}assets/images/proof/omid-minigame.jpg`

  return (
    <div className="world-body site">
      <figure className="site__shot">
        <img src={shot} alt="صفحهٔ اول سایت امید حیدری؛ میز چوبی و تاس‌های مینی‌گیم" width="900" height="633" loading="lazy" decoding="async" />
      </figure>
      <div className="site__side">
        <ul className="site__quotes">
          {project.site.quotes.map((quote) => (
            <li key={quote}>«<T>{quote}</T>»</li>
          ))}
        </ul>
        <a className="btn btn--solid is-playable" href={project.site.url} target="_blank" rel="noopener noreferrer">
          {project.site.label}
        </a>
      </div>

      {project.site.miniGame && (
        <div className="site__minigame">
          <p className="playhint playhint--inline">رمز سه‌تاس رو می‌تونید روی سایت زنده بازی کنید.</p>
          <h4>{project.site.miniGame.title}</h4>
          <figure className="site__minishot">
            <img src={mini} alt="مینی‌گیم حدس رمز سه تاس در صفحهٔ اول سایت امید حیدری" width="340" height="351" loading="lazy" decoding="async" />
            <figcaption>تاس‌ها روی همون میز چوبی صفحهٔ اول؛ پنج فرصت برای حدس رمز.</figcaption>
          </figure>
          <p><T>{project.site.miniGame.text}</T></p>
        </div>
      )}

      {project.site.details && (
        <ul className="site__details">
          {project.site.details.map((item) => (
            <li key={item}><T>{item}</T></li>
          ))}
        </ul>
      )}

      {project.site.aparat && (
        <div className="site__interview">
          {project.site.interviewNote && (
            <p className="world-note"><T>{project.site.interviewNote}</T></p>
          )}
          {project.site.aparat.map((video) => (
            <AparatEmbed key={video.hash} video={video} />
          ))}
        </div>
      )}
    </div>
  )
}
