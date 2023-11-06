import { useState, useEffect } from 'react'
import Account from '../components/Account.jsx'
import AccountButtons from '../components/AccountButtons.jsx'
import axios from 'axios'

const AccountPage = () => {
  let user
  const [emailVal, setEmailVal] = useState('')
  const [idVal, setIdVal] = useState(null)
  const [editMode, setEditMode] = useState(false)

  const changeMode = async () => {
    const accountData = { email: emailVal }
    const response = await axios.post(`/edit_account/${idVal}`, accountData)

    if (response.data.success) {
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
      setEmailVal(user.email)
      setIdVal(user.userId)
    })
  },[])

  return (
    <>
      <Account
      email={emailVal}
      setEmail={setEmailVal}
      isEditing={editMode}
      />

      <AccountButtons
      isEditing={editMode}
      changeMode={changeMode}
      />
    </>
  )
}

export default AccountPage