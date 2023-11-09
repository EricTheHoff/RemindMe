import { useState, useEffect } from 'react'
import axios from 'axios'
import Reminder from '../components/Reminder.jsx'

const MyRemindersPage = () => {
  let reminders
  const [listedReminders, setListedReminders] = useState([])

  const getReminders = async () => {
    const response = await axios.get('/get_reminders')
    reminders = response.data
    console.log(reminders)
  }

  const deleteMode = async (reminderId) => {
    const deletion = await axios.delete(`/delete_reminder/${reminderId}`)

    if(deletion.data.success) {
      alert(`Reminder deleted.`)
    } else {
      console.log(deletion.data.error)
    }

    const response = await axios.get('/get_reminders')
    reminders = response.data
    let flatData = reminders.flat()
    let mapResults = flatData.map((el) => {
      const { body, categoryId, deliverTo, deliveryDate, reminderId, title } = el
      const delivery = new Date(deliveryDate).toLocaleString()
  
      return (
          <Reminder
          key={reminderId}
          id={reminderId}
          title={title}
          body={body}
          deliverTo={deliverTo}
          deliveryDate={delivery}
          category={categoryId}
          deleteMode={deleteMode}
          />
      )

    })
    setListedReminders(mapResults)
}

  useEffect(() => {
    getReminders()
    .then(() => {
      let flatData = reminders.flat()
      let mapResults = flatData.map((el) => {
        const { body, categoryId, deliverTo, deliveryDate, reminderId, title } = el
        console.log(typeof(deliveryDate))
        const delivery = new Date(deliveryDate).toLocaleString()
    
        return (
            <Reminder
            key={reminderId}
            id={reminderId}
            title={title}
            body={body}
            deliverTo={deliverTo}
            deliveryDate={delivery}
            category={categoryId}
            deleteMode={deleteMode}
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
        <tbody>
          <tr>
            <th>Title</th>
            <th>Message</th>
            <th>Deliver To</th>
            <th>Delivery Time</th>
            <th>Category</th>
          </tr>
        </tbody>
      <tbody>
        {listedReminders}
      </tbody>
      </table>
    </>
  )
}

export default MyRemindersPage