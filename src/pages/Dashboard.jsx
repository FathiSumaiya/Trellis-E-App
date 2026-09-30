import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Field from '../components/Field'
import useForm from '../useForm'
import { rules } from '../validators'
import { useAuth } from '../App'

const ICONS = { Overview: '▦', Projects: '❐', Team: '☺', Settings: '⚙' }
const DAYS = [['Mon', 40], ['Tue', 65], ['Wed', 50], ['Thu', 90], ['Fri', 70], ['Sat', 25], ['Sun', 15]]

export default function Dashboard() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const [tab, setTab] = useState('Overview')
  const [projects, setProjects] = useState([{ n: 'Portfolio site', s: 'Active' }, { n: 'Brand guide', s: 'Active' }, { n: 'Invoice template', s: 'Done' }])
  const [status, setStatus] = useState('Active')
  const f = useForm({ project: '' }, rules)
  const add = d => { setProjects(p => [{ n: d.project.trim(), s: status }, ...p]); f.setValues({ project: '' }); f.setErrors({}) }
  const List = () => <ul className="list">{projects.map((p, i) => <li key={i}><span>{p.n}</span><span className={`pill ${p.s === 'Done' ? 'done' : ''}`}>{p.s}</span></li>)}</ul>
  const count = s => projects.filter(p => p.s === s).length

  return (
    <div className="app">
      <nav className="nav" aria-label="Main">
        <div className="logo">Trellis</div>
        {Object.keys(ICONS).map(k => (
          <button key={k} className={k === tab ? 'on' : ''} aria-current={k === tab} onClick={() => setTab(k)}>
            <span aria-hidden="true">{ICONS[k]}</span>{k}
          </button>
        ))}
        <div className="sp" />
        <button onClick={() => { logout(); nav('/login') }}><span aria-hidden="true">↩</span>Log out</button>
      </nav>
      <main className="main">
        <div className="top"><h1>{tab === 'Overview' ? `Hi, ${user.name.split(' ')[0]}` : tab}</h1><span className="pill">Frame 3 · Dashboard</span></div>
        {tab === 'Overview' && (
          <div className="grid">
            <div className="box stat"><i className="tag">Stat</i><span>Active projects</span><b>{count('Active')}</b></div>
            <div className="box stat"><i className="tag">Stat</i><span>Completed</span><b>{count('Done')}</b></div>
            <div className="box stat"><i className="tag">Stat</i><span>Hours this week</span><b>26</b></div>
            <div className="box wide"><i className="tag">Chart</i><h3>Hours by day</h3>
              <div className="bars" style={{ marginBottom: 24 }}>{DAYS.map(([d, h]) => <div key={d} style={{ height: h + '%' }}><small>{d}</small></div>)}</div></div>
            <div className="box"><i className="tag">List</i><h3>Projects</h3><List /></div>
          </div>
        )}
        {tab === 'Projects' && (
          <div className="box full"><i className="tag">Form</i><h3>Add a project</h3>
            <div className="inline"><form noValidate onSubmit={f.submit(add)}>
              <Field label="" placeholder="Project name" aria-label="Project name" {...f.bind('project')} />
              <select aria-label="Status" value={status} onChange={e => setStatus(e.target.value)}><option>Active</option><option>Done</option></select>
              <button className="btn">Add project</button>
            </form></div>
            <List />
          </div>
        )}
        {tab === 'Team' && <div className="box full"><i className="tag">Team</i><h3>Members</h3>
          <ul className="list"><li><span>{user.name} (you)</span><span className="pill">Owner</span></li><li><span>Invite a teammate from Settings</span><span className="pill">Empty</span></li></ul></div>}
        {tab === 'Settings' && <div className="box full"><i className="tag">Account</i><h3>Account</h3>
          <ul className="list"><li><span>Name</span><span>{user.name}</span></li><li><span>Email</span><span>{user.email}</span></li></ul></div>}
      </main>
    </div>
  )
}
