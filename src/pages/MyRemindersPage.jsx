import { useState, useEffect } from 'react'
import axios from 'axios'
import Reminder from '../components/Reminder.jsx'

const MyRemindersPage = () => {
  const [listedReminders, setListedReminders] = useState([])
  let reminders

  const getReminders = async () => {
    const response = await axios.get('/get_reminders')
    reminders = response.data
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
    console.log(`Component Rendered: MyRemindersPage`)
    getReminders()
    .then(() => {
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