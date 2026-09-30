import { createContext, useContext, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const AuthCtx = createContext(null)
export const useAuth = () => useContext(AuthCtx)
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }

export default function App() {
  const [users, setUsers] = useState(() => read('tr_users', []))
  const [session, setSession] = useState(() => read('tr_session', null))
  const persist = (u, s) => { localStorage.setItem('tr_users', JSON.stringify(u)); localStorage.setItem('tr_session', JSON.stringify(s)) }
  const api = {
    user: users.find(u => u.email === session),
    register(d) {
      if (users.some(u => u.email === d.email.toLowerCase())) return 'This email already has an account. Log in instead.'
      const next = [...users, { name: d.name.trim(), email: d.email.toLowerCase(), password: d.password }]
      setUsers(next); persist(next, session)
    },
    login(d) {
      const u = users.find(u => u.email === d.email.toLowerCase() && u.password === d.password)
      if (!u) return 'Email or password is incorrect. Check both and try again.'
      setSession(u.email); persist(users, u.email)
    },
    logout() { setSession(null); persist(users, null) },
  }
  const Guard = ({ children }) => (api.user ? children : <Navigate to="/login" replace />)
  return (
    <AuthCtx.Provider value={api}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Guard><Dashboard /></Guard>} />
        <Route path="*" element={<Navigate to={api.user ? '/dashboard' : '/register'} replace />} />
      </Routes>
    </AuthCtx.Provider>
  )
}
