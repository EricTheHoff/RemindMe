import { useState } from 'react'


const NewAccount = ({ createAccount }) => {
    const [emailVal, setEmailVal] = useState('')
    const [passwordVal, setPasswordVal] = useState('')

  return (
    <form onSubmit={(e) => {
        createAccount(e, {
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
        type='text'
        name='password'
        id='password'
        required
        onChange={(e) => setPasswordVal(e.target.value)}
        />
        <button type='submit'>Create Account</button>
    </form>
  )
}

export default NewAccount