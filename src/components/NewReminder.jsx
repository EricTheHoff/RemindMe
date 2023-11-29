import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useSelector } from 'react-redux'


const NewReminder = ({ createReminder }) => {
  const [title, setTitle] = useState('')
  const [deliverTo, setDeliverTo] = useState('')
  const [message, setMessage] = useState('')
  const [deliveryDate, setDeliveryDate] = useState(null)
  const activeId = useSelector((state) => state.activeUser)
  const categorySelection = document.getElementById('reminder_category')

  // Reminder is being created on form submission.
  return (
    <>
    <Container>
      <Row className='vh-50 d-flex justify-content-center align-items-center'>
        <Col lg={6}>
          <div className='border border-3 border-primary'></div>
          <Card className='shadow'>
            <Card.Body className='bg-default'>
              <h2 className='text-center tcolor-w'>Create a new Reminder</h2>
              <div className='mb-3'>

                <Form onSubmit={(e) => {
                  createReminder(e, {
                    title: title,
                    body: message,
                    deliverTo: deliverTo,
                    deliveryDate: deliveryDate,
                    category: categorySelection.value,
                    userId: activeId
                  })
                }}>
                  
                  <Row>
                    <Col>
                      <Form.Group className='mb-3' controlId='title'>
                        <Form.Label className='tcolor-w'>Title</Form.Label>
                        <Form.Control type='text' placeholder='Groceries' onChange={(e) => setTitle(e.target.value)}/>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className='mb-3' controlId='message'>
                        <Form.Label className='tcolor-w'>Message</Form.Label>
                        <Form.Control type='text' placeholder='Remember to pick up groceries.' onChange={(e) => setMessage(e.target.value)}/>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group className='mb-3' controlId='email'>
                        <Form.Label className='tcolor-w'>Deliver To</Form.Label>
                        <Form.Control type='email' placeholder='email@example.com' onChange={(e) => setDeliverTo(e.target.value)}/>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className='mb-3' controlId='date'>
                        <Form.Label className='tcolor-w'>Delivery Date</Form.Label>
                        <Form.Control type='datetime-local' onChange={(e) => setDeliveryDate(e.target.value)}/>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group className='mb-3' controlId='category'>
                        <Form.Label className='tcolor-w'>Category</Form.Label>
                        <Form.Select id='reminder_category'>
                          <option disabled selected={true}>-Choose One-</option>
                          <option value='1'>Chores</option>
                          <option value='2'>Errands</option>
                          <option value='3'>Appointments</option>
                          <option value='4'>Special Occasions</option>
                          <option value='5'>Misc.</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                <div className='d-grid'>
                  <Button variant='primary' type='submit'>Create Reminder</Button>
                </div>

                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

      {/* <form onSubmit={(e) => {
        createReminder(e, {
          title: title,
          body: message,
          deliverTo: deliverTo,
          deliveryDate: deliveryDate,
          category: categorySelection.value,
          userId: activeId
        })
      }}>

      <label htmlFor='title'>Title: </label>
        <input
        type='text'
        name='title'
        id='title'
        required
        onChange={(e) => setTitle(e.target.value)}
        />

      <label htmlFor='message'>Message: </label>
        <input
        type='text'
        name='message'
        id='message'
        required
        onChange={(e) => setMessage(e.target.value)}
        />

      <br/>

      <label htmlFor='deliver_to'>Deliver To: </label>
        <input
        type='email'
        name='deliver_to'
        id='deliver_to'
        required
        onChange={(e) => setDeliverTo(e.target.value)}
        />

      <label htmlFor='delivery_date'>Delivery Date: </label>
        <input
        type='datetime-local'
        name='delivery_date'
        id='delivery_date'
        required
        onChange={(e) => setDeliveryDate(e.target.value)}
        />

      <br/>

      <label htmlFor='category'>Category: </label>
        <select name='category' id='reminder_category'>
          <option disabled selected={true}>-Choose One-</option>
          <option value='1'>Chores</option>
          <option value='2'>Errands</option>
          <option value='3'>Appointments</option>
          <option value='4'>Special Occasions</option>
          <option value='5'>Misc.</option>
        </select>

      <br/>

      <button type='submit'>Create Reminder</button>

      </form> */}
    </>
  )
}  


export default NewReminder