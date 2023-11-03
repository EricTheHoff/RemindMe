import { useState, useEffect } from 'react'
import axios from 'axios'
import Reminder from '../components/Reminder.jsx'

const MyRemindersPage = () => {
  let reminders
  const [listedReminders, setListedReminders] = useState([])

  const getReminders = async () => {
    const response = await axios.get('/get_reminders')
    reminders = response.data
  }

  useEffect(() => {
    getReminders()
    .then(() => {
      let flatData = reminders.flat()
      let mapResults = flatData.map((el) => {
        const { body, categoryId, deliverTo, deliveryDate, reminderId, title } = el
    
        return (
            <Reminder
            key={reminderId}
            id={reminderId}
            title={title}
            body={body}
            deliverTo={deliverTo}
            deliveryDate={deliveryDate}
            category={categoryId}
            />
        )

      })
      setListedReminders(mapResults)
    })
  },[])

  return (
    <>
    <h3>My Reminders</h3>
      <table>
        <tr>
          <th>Title</th>
          <th>Message</th>
          <th>Deliver To</th>
          <th>Delivery Time</th>
          <th>Category</th>
        </tr>
        <tbody>
          {listedReminders}
        </tbody>
      </table>
    </>
  )
}

export default MyRemindersPage