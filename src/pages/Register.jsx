import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import Field from '../components/Field'
import useForm from '../useForm'
import { rules, strength } from '../validators'
import { useAuth } from '../App'

export default function Register() {
  const { register } = useAuth()
  const nav = useNavigate()
  const f = useForm({ name: '', email: '', password: '', confirm: '' }, rules)
  const s = strength(f.values.password)
  const onOk = d => {
    const err = register(d)
    if (err) return f.setErrors(e => ({ ...e, email: err }))
    nav('/login', { state: { flash: 'Account created. Log in to continue.' } })
  }
  return (
    <AuthLayout frame="Frame 1 · Registration" title="Start your workspace" text="Create an account to plan projects and track progress.">
      <form noValidate onSubmit={f.submit(onOk)}>
        <h1>Create account</h1><p className="sub">It takes under a minute.</p>
        <Field label="Full name" autoComplete="name" {...f.bind('name')} />
        <Field label="Email" type="email" autoComplete="email" {...f.bind('email')} />
        <Field label="Password" type="password" autoComplete="new-password" {...f.bind('password')} />
        <div className="meter"><i style={{ width: [0, 33, 66, 100][s] + '%', background: ['var(--err)', 'var(--err)', '#e5a100', 'var(--ok)'][s] }} /></div>
        <Field label="Confirm password" type="password" autoComplete="new-password" {...f.bind('confirm')} />
        <button className="btn">Create account</button>
        <div className="alt">Already registered? <Link to="/login">Log in</Link></div>
      </form>
    </AuthLayout>
  )
}
