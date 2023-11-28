import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import NewReminder from '../components/NewReminder'


const NewReminderPage = () => {
  const navigate = useNavigate()

  // addReminderEvent: This makes a post to the server and creates a Reminder in the database.
  const addReminderEvent = async (e, reminderData) => {
    e.preventDefault()
    const response = await axios.post('/new_reminder', reminderData)

    if(response.data.success) {
      if(confirm(`Your reminder has been created. Would you like to proceed to your Reminders List?`) === true) {
        navigate('/reminders')
      }
    } else {
    alert(`Something went wrong! Error: ${response.data.error}`)
    }
  }


  return (
    <>
      <NewReminder createReminder={addReminderEvent}/>
    </>
  )
}


export default NewReminderPage