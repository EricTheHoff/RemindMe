import { useState } from 'react'
import { useSelector } from 'react-redux'
import emailjs from '@emailjs/browser'

const NewReminder = ({ createReminder }) => {
    const [title, setTitle] = useState('')
    const [deliverTo, setDeliverTo] = useState('')
    const [message, setMessage] = useState('')
    const [deliveryDate, setDeliveryDate] = useState(null)
    const activeId = useSelector((state) => state.activeUser)
    const categorySelection = document.getElementById('reminder_category')

    // const sendReminder = (e) => {
    //   e.preventDefault()

    //   emailjs.send("service_dlkmluu","template_ani6abo", {
    //     title: title,
    //     message: message,
    //     category: categorySelection.value,
    //     deliverTo: deliverTo
    //   }, "I2V2mOJVRUQv4kj5Q")
    //   .then(() => {
    //     alert(`Email has been sent!`)
    //   })
    //   .catch((error) => {
    //     alert(`Something went wrong...`)
    //     console.log(error.text)
    //   })

    //   e.target.reset()
    // }

  return (
    <form onSubmit={(e) => {
        createReminder(e, {
            title: title,
            body: message,
            deliverTo: deliverTo,
            deliveryDate: deliveryDate,
            category: categorySelection.value,
            userId: activeId
        })
        // sendReminder(e)
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
          <option disabled defaultValue>-Choose One-</option>
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