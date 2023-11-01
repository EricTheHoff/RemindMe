import { useState } from 'react'

const NewReminder = ({ createReminder }) => {
    const [title, setTitle] = useState('')
    const [deliverTo, setDeliverTo] = useState('')
    const [message, setMessage] = useState('')
    const [deliveryDate, setDeliveryDate] = useState(null)
    let categorySelection = document.getElementById('reminder_category')

  return (
    <form onSubmit={(e) => {
        createReminder(e, {
            title: title,
            body: message,
            deliverTo: deliverTo,
            deliveryDate: deliveryDate,
            category: categorySelection.value
        })
    }}>
        <label htmlFor='title'>Title:</label>
        <input
        type='text'
        name='title'
        id='title'
        required
        onChange={(e) => setTitle(e.target.value)}
        />
        
        <label htmlFor='deliver_to'>Deliver To:</label>
        <input
        type='email'
        name='deliver_to'
        id='deliver_to'
        required
        onChange={(e) => setDeliverTo(e.target.value)}
        />

        <label htmlFor='delivery_date'>Delivery Date:</label>
        <input
        type='datetime-local'
        name='delivery_date'
        id='delivery_date'
        required
        onChange={(e) => setDeliveryDate(e.target.value)}
        />

        <label htmlFor='message'>Message:</label>
        <input
        type='text'
        name='message'
        id='message'
        required
        onChange={(e) => setMessage(e.target.value)}
        />

        <label htmlFor='category'>Category:</label>
        <select name='category' id='reminder_category'>
          <option value='1'>Chores</option>
          <option value='2'>Errands</option>
          <option value='3'>Appointments</option>
          <option value='4'>Special Occasions</option>
          <option value='5'>Misc.</option>
        </select>

        <button type='submit'>Create Reminder</button>
    </form>
  )
}

export default NewReminder