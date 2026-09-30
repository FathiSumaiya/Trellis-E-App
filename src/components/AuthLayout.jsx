export default function AuthLayout({ frame, title, text, children }) {
  return (
    <div className="canvas">
      <div className="flabel">{frame}</div>
      <div className="frame">
        <div className="side">
          <div className="logo">Trellis</div>
          <div><h2>{title}</h2><p>{text}</p></div>
          <div className="ticks"><span>Projects in one place</span><span>Simple team tracking</span><span>Works on any screen</span></div>
        </div>
        {children}
      </div>
    </div>
  )
}
