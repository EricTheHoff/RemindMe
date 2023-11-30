import axios from 'axios'
import Reminder from '../components/Reminder.jsx'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Col, Row, Container, Form, Table } from 'react-bootstrap'


const MyRemindersPage = () => {
  const [filteredCategory, setFilteredCategory] = useState('0')
  const [listedReminders, setListedReminders] = useState([])
  let reminders

  // getReminders: This queries the database and gets a list of all reminders associated with the logged in user. The list is set to the empty {reminders} variable.
  const getReminders = async () => {
    const response = await axios.get('/get_reminders')

    reminders = response.data
  }

  // deleteMode: This deletes a reminder with the matching parameter {reminderId} from the database.
  // After the reminder is deleted, it gets an updated list of reminders and maps through the list, creating a component for each reminder.
  const deleteMode = async (reminderId) => {
    const deletion = await axios.delete(`/delete_reminder/${reminderId}`)

    if (!deletion.data.success) {
      alert(`Something went wrong! Reminder could not be deleted.`)
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

  // useEffect: This is getting a list of user-specific reminders on render. This hook is dependent on the {filteredCategory} state value.
  // Depending on the value of {filteredCategory}, it maps through the list of reminders with that category and renders a component for each reminder.
  // The result of the map is saved to a state variable on this component.
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

    .catch((error) => {
    })
  },[filteredCategory])

  // If the {listedReminders} state value is empty, then display a message letting the user know they have no reminders (or to check the dropdown filter).
  if (listedReminders.length === 0) {
    return (
      <>
        <Container>
          <Row className='justify-content-center'>
            <h2 className='text-center pb-3'>My Reminders</h2>
            <Col className='text-center' lg={4}>

              <Form>
                <Form.Group className='mb-3' controlId='filter'>
                  <Form.Label>Filter by Category</Form.Label>
                  <Form.Select className='shadow' id='filter' onChange={(e) => setFilteredCategory(e.target.value)}>
                    <option value='0' selected={true}>All</option>
                    <option value='1'>Chores</option>
                    <option value='2'>Errands</option>
                    <option value='3'>Appointments</option>
                    <option value='4'>Special Occasions</option>
                    <option value='5'>Misc.</option>
                  </Form.Select>
                </Form.Group>
              </Form>

            </Col>

              <div className='text-center'>
                <p>It doesn't look like you have any reminders at the moment. <NavLink to='/new_reminder'>Click here</NavLink> to create a new reminder.</p>
                <p>If you're expecting to see a reminder, ensure that the <b>Filter by Category</b> option is set to <b>All</b>.</p>
              </div>

          </Row>
        </Container>
      </>
    )
  } else {
    return (
      <>
        <Container fluid>
          <Row className='justify-content-center'>
          <h2 className='text-center pb-3'>My Reminders</h2>
            <Col className='text-center' lg={4}>

              <Form>
                <Form.Group className='mb-3' controlId='filter'>
                  <Form.Label>Filter by Category</Form.Label>
                  <Form.Select className='shadow' id='filter' onChange={(e) => setFilteredCategory(e.target.value)}>
                    <option value='0' selected={true}>All</option>
                    <option value='1'>Chores</option>
                    <option value='2'>Errands</option>
                    <option value='3'>Appointments</option>
                    <option value='4'>Special Occasions</option>
                    <option value='5'>Misc.</option>
                  </Form.Select>
                </Form.Group>
              </Form>

            </Col>
          </Row>
          <div className='border border-3 border-primary'></div>
          <Table className='text-center' hover>
            <tbody>
              <tr>
                <th>Title</th>
                <th>Message</th>
                <th>Deliver To</th>
                <th>Delivery Time</th>
                <th>Category</th>
                <th></th>
              </tr>
            </tbody>
            <tbody>
              {listedReminders}
            </tbody>
          </Table>
        </Container>
      </>
    )
  }
}


export default MyRemindersPage