import { useState } from 'react'
export default function useForm(initial, rules) {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const check = (n, v = values) => rules[n]?.(v[n], v) || ''
  const bind = n => ({
    name: n, value: values[n], error: errors[n],
    onChange: e => {
      const next = { ...values, [n]: e.target.value }
      setValues(next)
      setErrors(er => {
        const out = { ...er }
        if (er[n]) out[n] = check(n, next)
        if (n === 'password' && er.confirm !== undefined) out.confirm = check('confirm', next)
        return out
      })
    },
    onBlur: () => setErrors(er => ({ ...er, [n]: check(n) })),
  })
  const submit = cb => e => {
    e.preventDefault()
    const errs = Object.fromEntries(Object.keys(initial).map(n => [n, check(n)]))
    setErrors(errs)
    if (Object.values(errs).every(x => !x)) cb(values)
  }
  return { values, errors, setErrors, setValues, bind, submit }
}
