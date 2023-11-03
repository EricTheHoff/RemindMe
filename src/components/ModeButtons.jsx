

const ModeButtons = ({ isEditing, changeMode, id }) => {

  return isEditing ? (
    <td>
        <button onClick={changeMode}>Save</button>
    </td>
  ) : (
    <td>
        <button onClick={changeMode}>Edit</button>
        <button>Delete</button>
    </td>
  )
}

export default ModeButtons