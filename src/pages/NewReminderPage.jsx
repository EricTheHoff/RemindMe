import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import NewReminder from '../components/NewReminder'

const NewReminderPage = () => {
  const navigate = useNavigate()

    const addReminderEvent = async (e, reminderData) => {
        e.preventDefault()

        const response = await axios.post('/new_reminder', reminderData)
        if(response.data.success) {
          if(confirm(`Your reminder has been created. Would you like to proceed to your Reminders List?`) === true) {
            navigate('/reminders')
          }
        } else {
          alert(`The following error has occurred: ${response.data.error}`)
        }
  }

  return (
    <>
      <h3>Create a new reminder</h3>
      <NewReminder createReminder={addReminderEvent}/>
    </>
  )
}

export default NewReminderPage