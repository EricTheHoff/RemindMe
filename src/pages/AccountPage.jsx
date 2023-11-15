import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Account from '../components/Account.jsx'
import AccountButtons from '../components/AccountButtons.jsx'
import axios from 'axios'

const AccountPage = () => {
  const [emailVal, setEmailVal] = useState('')
  const [currentPasswordVal, setCurrentPasswordVal] = useState('')
  const [newPasswordVal, setNewPasswordVal] = useState('')
  const [confirmPasswordVal, setConfirmPasswordVal] = useState('')
  const [firstNameVal, setFirstNameVal] = useState('')
  const [lastNameVal, setLastNameVal] = useState('')
  const [idVal, setIdVal] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const dispatch = useDispatch()
  let user

  const updateUser = async () => {
    const accountData = {
      email: emailVal,
      currentPassword: currentPasswordVal,
      newPassword: newPasswordVal,
      firstName: firstNameVal,
      lastName: lastNameVal
    }
    const response = await axios.post(`/edit_account/${idVal}`, accountData)

    if (response.data.success) {
      dispatch({ type: 'First Name Active', payload: firstNameVal })
      setEditMode(!editMode)
    } else {
      alert(`Update failed. Please ensure that the you're entering the correct password into the Current Password field.`)
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
      <h3>Account Information</h3>
      
      <Account
      email={emailVal}
      setEmail={setEmailVal}
      currentPassword={currentPasswordVal}
      setCurrentPassword={setCurrentPasswordVal}
      newPassword={newPasswordVal}
      setNewPassword={setNewPasswordVal}
      confirmPassword={confirmPasswordVal}
      setConfirmPassword={setConfirmPasswordVal}
      firstName={firstNameVal}
      setFirstName={setFirstNameVal}
      lastName={lastNameVal}
      setLastName={setLastNameVal}
      isEditing={editMode}
      updateUser={updateUser}
      />

      <br/>

      <AccountButtons
      isEditing={editMode}
      setIsEditing={setEditMode}
      />
    </>
  )
}

export default AccountPage