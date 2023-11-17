const ModeButtons = ({ isEditing, editReminder, deleteMode, id }) => {
  // Using a ternary to check if isEditing is set to {true} and render appropriately based off of that.
  return isEditing ? (
    <>
      <td>
        <button onClick={editReminder}>Save</button>
      </td>
    </>
      ) : (
    <>
      <td>
        <button onClick={editReminder}>Edit</button>
        <button onClick={() => deleteMode(id)}>Delete</button>
      </td>
    </>
  )
}


export default ModeButtons