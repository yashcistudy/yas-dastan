import { contact, CONTACT_EMAIL } from '../data/content.js'
import ContactForm from './ContactForm.jsx'
import { useInView } from '../hooks/useInView.js'
import './ContactSection.css'
import T from '../utils/Bidi.jsx'

/** The last chapter. A human ending, in Yas's own voice. */
export default function ContactSection() {
  const [ref, inView] = useInView()

  return (
    <section className="section contact" id="contact" ref={ref}>
      <div className={`contact__inner reveal${inView ? ' is-in' : ''}`}>
        <span className="section__kicker">{contact.kicker}</span>
        <h2 className="section__title">{contact.title}</h2>
        {contact.lines.map((line) => (
          <p key={line} className="contact__line">
            <T>{line}</T>
          </p>
        ))}

        <div className="contact__actions">
          {contact.actions.map((action) => (
            <a
              key={action.label}
              className={`btn ${action.primary ? 'btn--solid' : 'btn--outline'}`}
              href={action.href}
              {...(action.primary ? {} : { download: true })}
            >
              {action.label}
            </a>
          ))}
        </div>

        <ContactForm form={contact.form} />

        <p className="contact__direct">
          یا مستقیم: <a href={`mailto:${CONTACT_EMAIL}`} className="ltr" dir="ltr">{CONTACT_EMAIL}</a>
        </p>

        <ul className="contact__channels">
          {contact.channels.map((channel) => (
            <li key={channel.href}>
              <a href={channel.href} target="_blank" rel="noopener noreferrer">
                {channel.label}
              </a>
            </li>
          ))}
        </ul>

        <footer className="contact__signature">
          <p className="contact__footer-line"><T>{contact.footerLine}</T></p>
          <p>{contact.signature}</p>
        </footer>
      </div>
    </section>
  )
}
