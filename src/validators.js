export const rules = {
  name: v => (v.trim().length < 2 ? 'Enter your full name (at least 2 characters).' : ''),
  email: v => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Enter an email like name@example.com.'),
  password: v => (v.length < 8 ? 'Use at least 8 characters.' : !/\d/.test(v) || !/[a-zA-Z]/.test(v) ? 'Include a letter and a number.' : ''),
  confirm: (v, all) => (v !== all.password ? 'Passwords do not match.' : ''),
  project: v => (v.trim() ? '' : 'Enter a project name.'),
}
export const strength = v => {
  let s = 0
  if (v.length >= 8) s++
  if (/\d/.test(v) && /[a-zA-Z]/.test(v)) s++
  if (v.length >= 12 || /[^\w]/.test(v)) s++
  return s
}
