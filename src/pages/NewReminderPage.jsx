import axios from 'axios'
import NewReminder from '../components/NewReminder'

const NewReminderPage = () => {

    const addReminderEvent = async (e, reminderData) => {
        e.preventDefault()

        if(confirm(`Once your reminder has been created, the delivery date cannot be changed. Do you wish to proceed?`) === true) {
          const response = await axios.post('/new_reminder', reminderData)
  
          if(response.data.success) {
            alert(`Your Reminder has been successfully created.`)
          } else {
            alert(`An error has occurred. Please ensure that you don't have another reminder with the same title.`)
          }
        }
    }

  return (
    <>
      <h4>Create new Reminders here!</h4>
      <h5>Note: The title for each reminder must be unique.</h5>
      <NewReminder createReminder={addReminderEvent}/>
    </>
  )
}

export default NewReminderPage