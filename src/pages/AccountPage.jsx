import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Account from '../components/Account.jsx'
import AccountButtons from '../components/AccountButtons.jsx'
import axios from 'axios'

const AccountPage = () => {
  const [emailVal, setEmailVal] = useState('')
  const [passwordVal, setPasswordVal] = useState('')
  const [firstNameVal, setFirstNameVal] = useState('')
  const [lastNameVal, setLastNameVal] = useState('')
  const [idVal, setIdVal] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const dispatch = useDispatch()
  let user

  const changeMode = async () => {
    const accountData = {
      email: emailVal,
      password: passwordVal,
      firstName: firstNameVal,
      lastName: lastNameVal
    }
    const response = await axios.post(`/edit_account/${idVal}`, accountData)

    if (response.data.success) {
      dispatch({ type: 'First Name Active', payload: firstNameVal })
      setEditMode(!editMode)
    } else {
      alert(`Something went wrong: ${response.data.error}`)
    }
  }

  const getAccount = async () => {
    const response = await axios.get('/get_user')
    user = response.data
  }

  useEffect(() => {
    getAccount()
    .then(() => {
      setFirstNameVal(user.firstName)
      setLastNameVal(user.lastName)
      setEmailVal(user.email)
      setIdVal(user.userId)
    })
  },[])

  return (
    <>
      <Account
      email={emailVal}
      setEmail={setEmailVal}
      password={passwordVal}
      setPassword={setPasswordVal}
      firstName={firstNameVal}
      setFirstName={setFirstNameVal}
      lastName={lastNameVal}
      setLastName={setLastNameVal}
      isEditing={editMode}
      />

      <br/>

      <AccountButtons
      isEditing={editMode}
      changeMode={changeMode}
      />
    </>
  )
}

export default AccountPage