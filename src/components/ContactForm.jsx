import { useState } from 'react'

/**
 * Contact form.
 *
 * The visitor picks the kind of work they need, using the same role names the
 * projects above use, so the first message already has a subject. The form
 * posts to Formspree with fetch, so the visitor never leaves the experience.
 */
export default function ContactForm({ form }) {
  const [state, setState] = useState('idle') // idle | sending | done | error

  const submit = async (event) => {
    event.preventDefault()
    const element = event.currentTarget
    const data = new FormData(element)
    setState('sending')
    try {
      const response = await fetch(form.endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      })
      if (!response.ok) throw new Error('request failed')
      element.reset()
      setState('done')
    } catch {
      setState('error')
    }
  }

  return (
    <form className="cform" onSubmit={submit} noValidate={false}>
      <h3 className="cform__title">{form.title}</h3>
      <p className="cform__lead">{form.lead}</p>

      <div className="cform__grid">
        <label className="cform__field">
          <span>{form.fields.name}</span>
          <input type="text" name="name" autoComplete="name" required />
        </label>

        <label className="cform__field">
          <span>{form.fields.contact}</span>
          <input type="text" name="reply" inputMode="email" autoComplete="email" required />
        </label>

        <label className="cform__field cform__field--wide">
          <span>{form.fields.role}</span>
          <select name="role" defaultValue={form.roles[0]} required>
            {form.roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>

        <label className="cform__field cform__field--wide">
          <span>{form.fields.message}</span>
          <textarea name="message" rows={4} required />
        </label>
      </div>

      {/* Formspree honeypot: real people never fill this in. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="cform__trap" aria-hidden="true" />

      <div className="cform__foot">
        <button type="submit" className="btn btn--solid" disabled={state === 'sending'}>
          {state === 'sending' ? form.sending : form.submit}
        </button>
        <p className="cform__status" role="status" aria-live="polite">
          {state === 'done' && form.success}
          {state === 'error' && form.error}
        </p>
      </div>
    </form>
  )
}
