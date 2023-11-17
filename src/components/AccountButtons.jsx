const AccountButtons = ({ isEditing, setIsEditing }) => {
  // Using a ternary to check if isEditing is set to {true} and render appropriately based off of that.
  return isEditing ? (
    <>
    </>
  ) : (
    <>
      <button onClick={() => setIsEditing(true)}>Edit</button>
    </>
  )
}


export default AccountButtons