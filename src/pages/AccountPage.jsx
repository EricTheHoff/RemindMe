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

  // getAccount: This grabs information about the logged-in user and saves it to the empty {user} variable.
  const getAccount = async () => {
    await axios.get('/get_user')
    // console.log(`This get_user has been hit`)
    .then((response) => {
      let user = response.data
      setFirstNameVal(user.firstName)
      setLastNameVal(user.lastName)
      setEmailVal(user.email)
      setIdVal(user.userId)
    })
    .catch((error) => {
      console.log(`This has been hit`)
    })
  }

  // useEffect: This hook is grabbing information about the logged-in user on render and updating state variables in this component with data received from the server's response.
  useEffect(() => {
    getAccount()

  },[])
  
  // updateUser: This function calls the server and sends an object with the edited account information in the request.
  // On success, a redux value is updated and the editMode is set back to false.
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


  return (
    <>
      {/* <h3>Account Information</h3> */}
      
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
      setIsEditing={setEditMode}
      updateUser={updateUser}
      />

      {/* <br/>

      <AccountButtons
      isEditing={editMode}
      setIsEditing={setEditMode}
      /> */}
    </>
  )
}


export default AccountPage