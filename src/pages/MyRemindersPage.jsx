import { useEffect } from 'react'
import axios from 'axios'
import MyReminders from '../components/MyReminders.jsx'

const MyRemindersPage = () => {
  const reminderArray = []

  const getReminders = async () => {
    const response = await axios.get('/get_reminders')
    reminderArray.push(response.data)

    console.log(reminderArray)
    }

  useEffect(() => {
    getReminders()
  },[])

  return (
    <>
      <MyReminders
      reminders={reminderArray}
      />
    </>
  )
}

export default MyRemindersPage