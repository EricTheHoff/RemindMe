import { useState } from 'react'

const NewReminder = ({ createReminder }) => {
    const [title, setTitle] = useState('')
    const [deliverTo, setDeliverTo] = useState('')
    const [message, setMessage] = useState('')
    const [deliveryDate, setDeliveryDate] = useState(null)

  return (
    <form onSubmit={(e) => {
        createReminder(e, {
            title: title,
            body: message,
            deliverTo: deliverTo,
            deliveryDate: deliveryDate
        })
    }}>
        <label>Title:</label>
        <input
        type='text'
        name='title'
        id='title'
        required
        onChange={(e) => setTitle(e.target.value)}
        />
        
        <label>Deliver To:</label>
        <input
        type='email'
        name='deliver_to'
        id='deliver_to'
        required
        onChange={(e) => setDeliverTo(e.target.value)}
        />

        <label>Delivery Date:</label>
        <input
        type='datetime-local'
        name='delivery_date'
        id='delivery_date'
        required
        onChange={(e) => setDeliveryDate(e.target.value)}
        />

        <label>Message:</label>
        <input
        type='text'
        name='message'
        id='message'
        required
        onChange={(e) => setMessage(e.target.value)}
        />

        <button type='submit'>Create Reminder</button>
    </form>
  )
}

export default NewReminder