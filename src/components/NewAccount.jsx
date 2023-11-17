import { useState } from 'react'


const NewAccount = ({ createAccount }) => {
  const [firstNameVal, setFirstNameVal] = useState('')
  const [lastNameVal, setLastNameVal] = useState('')
  const [emailVal, setEmailVal] = useState('')
  const [passwordVal, setPasswordVal] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // New account is being created on form submission. Before attempting to create the account, it will check to ensure that the password and confirm password values match.
  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault()

        if (passwordVal !== confirmPassword) {
        alert(`Passwords do not match. Please try again.`)
        } else {
          createAccount(e, {
            firstName: firstNameVal,
            lastName: lastNameVal,
            email: emailVal,
            password: passwordVal
          })
        }
      }}>

      <label htmlFor='firstName'>First Name: </label>
        <input
        type='text'
        name='firstName'
        id='firstName'
        required
        onChange={(e) => setFirstNameVal(e.target.value)}
        />

      <label htmlFor='lastName'>Last Name: </label>
        <input
        type='text'
        name='lastName'
        id='lastName'
        required
        onChange={(e) => setLastNameVal(e.target.value)}
        />

      <br/>

      <label htmlFor='email'>Email: </label>
        <input
        type='email'
        name='email'
        id='email'
        required
        onChange={(e) => setEmailVal(e.target.value)}
        />

      <label htmlFor='password'>Password: </label>
        <input
        type='password'
        name='password'
        id='password'
        required
        onChange={(e) => setPasswordVal(e.target.value)}
        />

      <label htmlFor='confirm_password'>Confirm Password: </label>
        <input
        type='password'
        name='confirm_password'
        id='confirm_password'
        required
        onChange={(e) => setConfirmPassword(e.target.value)}
        />

      <br/>

      <button type='submit'>Create Account</button>

      </form>
    </>
  )
}


export default NewAccount