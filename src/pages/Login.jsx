import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import Field from '../components/Field'
import useForm from '../useForm'
import { rules } from '../validators'
import { useAuth } from '../App'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const flash = useLocation().state?.flash
  const [fail, setFail] = useState('')
  const f = useForm({ email: '', password: '' }, { email: rules.email, password: v => (v ? '' : 'Enter your password.') })
  const onOk = d => { const err = login(d); err ? setFail(err) : nav('/dashboard') }
  return (
    <AuthLayout frame="Frame 2 · Login" title="Welcome back" text="Pick up where you left off.">
      <form noValidate onSubmit={f.submit(onOk)}>
        <h1>Log in</h1><p className="sub">Use the email you registered with.</p>
        {flash && <div className="banner">{flash}</div>}
        <Field label="Email" type="email" autoComplete="email" {...f.bind('email')} />
        <Field label="Password" type="password" autoComplete="current-password" {...f.bind('password')} />
        <div className="msg" role="alert">{fail}</div>
        <button className="btn">Log in</button>
        <div className="alt">New here? <Link to="/register">Create an account</Link></div>
      </form>
    </AuthLayout>
  )
}
