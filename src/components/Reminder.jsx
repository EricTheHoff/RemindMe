import { useState } from 'react'

const Reminder = ({ key, id, title, body, deliverTo, deliveryDate, category }) => {
    
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
    </tr>
    </>
  )
}

export default Reminder