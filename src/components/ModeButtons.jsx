import { Button } from 'react-bootstrap'


const ModeButtons = ({ isEditing, editReminder, deleteMode, id }) => {
  // Using a ternary to check if isEditing is set to {true} and render appropriately based off of that.
  return isEditing ? (
    <>
      <td>
        <Button className='bg-default' onClick={editReminder}>Save</Button>
      </td>
    </>
      ) : (
    <>
      <td>
        <Button className='bg-default' onClick={editReminder}>Edit</Button>
        <Button variant='danger' onClick={() => deleteMode(id)}>Delete</Button>
      </td>
    </>
  )
}


export default ModeButtons