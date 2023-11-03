import { useState } from 'react'
import ModeButtons from './ModeButtons.jsx'

const Reminder = ({ id, title, body, deliverTo, deliveryDate, category, isEditing }) => {
    const [editMode, setEditMode] = useState(isEditing)
    const [titleVal, setTitleVal] = useState(title)
    const [bodyVal, setBodyVal] = useState(body)
    const [deliverToVal, setDeliverToVal] = useState(deliverTo)
    const [deliveryDateVal, setDeliveryDateVal] = useState(deliveryDate)
    const [categoryVal, setCategoryVal] = useState(category)

    const changeMode = async () => {
        const reminder = {
            id: id,
            title: titleVal,
            body: bodyVal,
            deliverTo: deliverToVal,
            deliveryDate: deliveryDateVal,
            category: categoryVal
        }
        const response = await axios.post('/edit_reminder', reminder)
        console.log(response.data)
        setEditMode(!editMode)
    }

    
    if (category === 1) {
        category = 'Chores'
    } else if (category === 2) {
        category = 'Errands'
    } else if (category === 3) {
        category = 'Appointments'
    } else if (category === 4) {
        category = 'Special Occasions'
    } else if (category === 5) {
        category = 'Misc.'
    }

  return (
    <>
    <tr>
        <td>
            {title}
        </td>
        <td>
            {body}
        </td>
        <td>
            {deliverTo}
        </td>
        <td>
            {deliveryDate}
        </td>
        <td>
            {category}
        </td>

        <ModeButtons
        isEditing={editMode}
        changeMode={changeMode}
        id={id}
        />
        
    </tr>
    </>
  )
}

export default Reminder