import { useState, useEffect } from 'react'
import axios from 'axios'
import Reminder from '../components/Reminder.jsx'

const MyRemindersPage = () => {
  const [filteredCategory, setFilteredCategory] = useState('0')
  const [listedReminders, setListedReminders] = useState([])
  let reminders


  const getReminders = async () => {
    const response = await axios.get('/get_reminders')
    reminders = response.data
  }


  const deleteMode = async (reminderId) => {
    const deletion = await axios.delete(`/delete_reminder/${reminderId}`)

    if (deletion.data.success) {
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

      if (filteredCategory == 1) {
        let filterResults = flatData.filter((el) => {
          const { categoryId } = el
          return categoryId == 1
        })
        let mapResults = filterResults.map((el) => {
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


      } else if (filteredCategory == 2) {
        let filterResults = flatData.filter((el) => {
          const { categoryId } = el
          return categoryId == 2
        })
        let mapResults = filterResults.map((el) => {
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
      
      
      } else if (filteredCategory == 3) {
        let filterResults = flatData.filter((el) => {
          const { categoryId } = el
          return categoryId == 3
        })
        let mapResults = filterResults.map((el) => {
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
      
      
      } else if (filteredCategory == 4) {
        let filterResults = flatData.filter((el) => {
          const { categoryId } = el
          return categoryId == 4
        })
        let mapResults = filterResults.map((el) => {
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
      
      
      } else if (filteredCategory == 5) {
        let filterResults = flatData.filter((el) => {
          const { categoryId } = el
          return categoryId == 5
        })
        let mapResults = filterResults.map((el) => {
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
      
      
      } else {
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
    })
  },[filteredCategory])

  if (listedReminders.length === 0) {
    return (
      <>
        <h3>My Reminders</h3>
        <p>It doesn't look like you have any reminders at the moment.</p>
      </>
    )
  } else {
    return (
      <>
        <h3>My Reminders</h3>

        <label htmlFor='filter'>Filter by Category: </label>
          <select name='filter' id='filter' onChange={(e) => setFilteredCategory(e.target.value)}>
              <option value='0' selected={true}>All</option>
              <option value='1'>Chores</option>
              <option value='2'>Errands</option>
              <option value='3'>Appointments</option>
              <option value='4'>Special Occasions</option>
              <option value='5'>Misc.</option>
          </select>

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
}

export default MyRemindersPage