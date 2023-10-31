import axios from 'axios'
import NewReminder from '../components/NewReminder'

const NewReminderPage = () => {

    const addReminderEvent = async (e, reminderData) => {
        e.preventDefault()
        const response = await axios.post('/new_reminder', reminderData)

        if(response.data.success) {
            console.log(`Reminder Successfully Created`)
        }
    }
  return (
    <>
        <NewReminder createReminder={addReminderEvent}/>
    </>
  )
}

export default NewReminderPage