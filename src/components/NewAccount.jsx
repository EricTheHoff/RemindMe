import { useState } from 'react'


const NewAccount = ({ createAccount }) => {
    const [emailVal, setEmailVal] = useState('')
    const [passwordVal, setPasswordVal] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <form onSubmit={(e) => {
        e.preventDefault()
        if (passwordVal !== confirmPassword) {
          alert(`Passwords do not match. Please try again.`)
        } else {
          createAccount(e, {
              email: emailVal,
              password: passwordVal
          })
        }
      }}>
        <label htmlFor='email'>Email</label>
        <input
        type='email'
        name='email'
        id='email'
        required
        onChange={(e) => setEmailVal(e.target.value)}
        />

        <label htmlFor='password'>Password</label>
        <input
        type='password'
        name='password'
        id='password'
        required
        onChange={(e) => setPasswordVal(e.target.value)}
        />

        <label htmlFor='confirm_password'>Confirm Password</label>
        <input
        type='password'
        name='confirm_password'
        id='confirm_password'
        required
        onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type='submit'>Create Account</button>
    </form>
  )
}

export default NewAccount