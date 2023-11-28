import { Button } from 'react-bootstrap'


const AccountButtons = ({ isEditing, setIsEditing }) => {
  // Using a ternary to check if isEditing is set to {true} and render appropriately based off of that.
  return isEditing ? (
    <>
    </>
  ) : (
    <>
      <Button variant='primary' onClick={() => setIsEditing(true)}>Edit</Button>
    </>
  )
}


export default AccountButtons