export default function Field({ label, type = 'text', error, ...rest }) {
  const state = error ? 'bad' : rest.value ? 'good' : ''
  return (
    <div className={`field ${state}`}>
      <label htmlFor={rest.name}>{label}</label>
      <input id={rest.name} type={type} aria-invalid={!!error} {...rest} />
      <div className="msg" role="alert">{error}</div>
    </div>
  )
}
