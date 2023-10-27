import { useState } from 'react'

const Login = ({ userLogsIn }) => {
    const [emailVal, setEmailVal] = useState('')
    const [passwordVal, setPasswordVal] = useState('')

  return (
    <form onSubmit={(e) => {
        userLogsIn(e, {
            email: emailVal,
            password: passwordVal
        })
    }}>
        <label htmlFor='email'>Email</label>
        <input
        type='text'
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
        <button type='submit'>Log In</button>
    </form>
  )
}

export default Login