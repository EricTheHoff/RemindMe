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

    
    const scheduleReminder = (e) => {
      e.preventDefault()
      
      let categoryName
      switch (categorySelection.value) {
        case '1':
          categoryName = 'Chores'
          break
        case '2':
          categoryName = 'Errands'
          break
        case '3':
          categoryName = 'Appointments'
          break
        case '4':
          categoryName = 'Special Occasions'
          break
        case '5':
          categoryName = 'Misc.'
      }

      const dateForDelivery = new Date(deliveryDate)
      const parsedDelivery = Date.parse(dateForDelivery)
      const today = new Date()
      const parsedToday = Date.parse(today)
      const timeoutVal = parsedDelivery - parsedToday

      setTimeout(() => {
        emailjs.send("service_dlkmluu", "template_ani6abo", {
          title: title,
          message: message,
          category: categoryName,
          deliverTo: deliverTo
        }, "I2V2mOJVRUQv4kj5Q")
        .then(() => {
          console.log(`Email has been sent to ${deliverTo}`)
        })
        .catch((error) => {
          console.log(`The following error has occurred: ${error}`)
        })
      }, timeoutVal)

      e.target.reset()
    }

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
        scheduleReminder(e)
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
          <option disabled selected={true}>-Choose One-</option>
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