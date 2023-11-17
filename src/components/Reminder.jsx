import { useState } from 'react'
import axios from 'axios'
import ModeButtons from './ModeButtons.jsx'
import Body from './reminder_components/Body.jsx'
import Category from './reminder_components/Category.jsx'
import DeliverTo from './reminder_components/DeliverTo.jsx'
import DeliveryDate from './reminder_components/DeliveryDate.jsx'
import Title from './reminder_components/Title.jsx'


const Reminder = ({ id, title, body, deliverTo, deliveryDate, category, deleteMode }) => {
  const [editMode, setEditMode] = useState(false)
  const [titleVal, setTitleVal] = useState(title)
  const [bodyVal, setBodyVal] = useState(body)
  const [deliverToVal, setDeliverToVal] = useState(deliverTo)
  const [deliveryDateVal, setDeliveryDateVal] = useState(deliveryDate)
  const [categoryVal, setCategoryVal] = useState(category)

  // editReminder: Makes a call to the server with the edited reminder information saved in an object in the request.
  const editReminder = async () => {
    const reminder = {
      title: titleVal,
      body: bodyVal,
      deliverTo: deliverToVal,
      deliveryDate: deliveryDateVal,
      category: categoryVal
    }
    const response = await axios.post(`/update_reminder/${id}`, reminder)
    
    if (response.data.success) {
      setEditMode(!editMode)
    } else {
     alert(`Something went wrong: ${response.data.error}`)
    }
  }

  // Returning each cell of the reminder as an individual component so it's easier to edit them.
  return (
    <>
      <tr>
        <td>
          <Title
          val={titleVal}
          setVal={setTitleVal}
          isEditing={editMode}
          />
        </td>
        <td>
          <Body
          val={bodyVal}
          setVal={setBodyVal}
          isEditing={editMode}
          />
        </td>
        <td>
          <DeliverTo
          val={deliverToVal}
          setVal={setDeliverToVal}
          isEditing={editMode}
          />
        </td>
        <td>
          <DeliveryDate
          val={deliveryDateVal}
          setVal={setDeliveryDateVal}
          isEditing={editMode}
          />
        </td>
        <td>
          <Category
          val={categoryVal}
          setVal={setCategoryVal}
          isEditing={editMode}
          />
        </td>

      <ModeButtons
      isEditing={editMode}
      editReminder={editReminder}
      deleteMode={deleteMode}
      id={id}
      />

      </tr>
    </>
  )
}


export default Reminder