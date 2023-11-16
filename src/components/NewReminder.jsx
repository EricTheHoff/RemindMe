import { useState } from 'react'
import { useSelector } from 'react-redux'

const NewReminder = ({ createReminder }) => {
    const [title, setTitle] = useState('')
    const [deliverTo, setDeliverTo] = useState('')
    const [message, setMessage] = useState('')
    const [deliveryDate, setDeliveryDate] = useState(null)
    const activeId = useSelector((state) => state.activeUser)
    const categorySelection = document.getElementById('reminder_category')

  return (
    <form onSubmit={(e) => {
      console.log(activeId)
      if (confirm(`Would you like to send an SMS message with this reminder?`) === true) {
        const phoneNumber = prompt(`Please enter a valid 10-digit US phone number.`)
        // console.log(phoneNumber, phoneNumber.length)
        if (phoneNumber.length !== 10) {
          alert(`That is not a valid phone number. Please try again.`)
          e.preventDefault()
          return
        } else {
          let e164 = `+1${phoneNumber}`
          console.log(e164)
        }
          createReminder(e, {
              title: title,
              body: message,
              deliverTo: deliverTo,
              deliveryDate: deliveryDate,
              category: categorySelection.value,
              userId: activeId
          })
      } else {
        createReminder(e, {
          title: title,
          body: message,
          deliverTo: deliverTo,
          deliveryDate: deliveryDate,
          category: categorySelection.value,
          userId: activeId
        })
      }
    }}>
        <label htmlFor='title'>Title: </label>
        <input
        type='text'
        name='title'
        id='title'
        required
        onChange={(e) => setTitle(e.target.value)}
        />
        
        <label htmlFor='deliver_to'>Deliver To: </label>
        <input
        type='email'
        name='deliver_to'
        id='deliver_to'
        required
        onChange={(e) => setDeliverTo(e.target.value)}
        />

        <label htmlFor='delivery_date'>Delivery Date: </label>
        <input
        type='datetime-local'
        name='delivery_date'
        id='delivery_date'
        required
        onChange={(e) => setDeliveryDate(e.target.value)}
        />

        <label htmlFor='message'>Message: </label>
        <input
        type='text'
        name='message'
        id='message'
        required
        onChange={(e) => setMessage(e.target.value)}
        />

        <label htmlFor='category'>Category: </label>
        <select name='category' id='reminder_category'>
          <option disabled selected={true}>-Choose One-</option>
          <option value='1'>Chores</option>
          <option value='2'>Errands</option>
          <option value='3'>Appointments</option>
          <option value='4'>Special Occasions</option>
          <option value='5'>Misc.</option>
        </select>

        <br/>

        <button type='submit'>Create Reminder</button>
    </form>
  )
}  

export default NewReminder