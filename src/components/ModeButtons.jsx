

const ModeButtons = ({ isEditing, changeMode, deleteMode, id }) => {

  return isEditing ? (
    <td>
        <button onClick={changeMode}>Save</button>
    </td>
  ) : (
    <td>
        <button onClick={changeMode}>Edit</button>
        <button onClick={() => deleteMode(id)}>Delete</button>
    </td>
  )
}

export default ModeButtons