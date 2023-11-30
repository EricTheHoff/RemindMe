import axios from 'axios'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap'


const NewAccount = () => {
  const [firstNameVal, setFirstNameVal] = useState('')
  const [lastNameVal, setLastNameVal] = useState('')
  const [emailVal, setEmailVal] = useState('')
  const [passwordVal, setPasswordVal] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  

  const newAccountEvent = async (e, newAccountData) => {
    e.preventDefault()
    const checkUser = await axios.post('/check_user', newAccountData)

    if (checkUser.data.success) {
      alert(`There is already an account registered to that email.`)
    } else {
      const response = await axios.post('/create_account', newAccountData)
      
      if (response.data.success) {
        const activeUser = await axios.get('/get_user')
        dispatch({ type: 'Logged In' })
        dispatch({ type: 'Active User', payload: activeUser.data.userId })
        dispatch({ type: 'First Name Active', payload: activeUser.data.firstName })
        navigate('/reminders')
      } else {
        alert(`Something went wrong! Error: ${response.data.error}`)
      }
    }
  }

  // New account is being created on form submission. Before attempting to create the account, it will check to ensure that the password and confirm password values match.
  return (
    <>
      <Container>
        <Row className='vh-50 d-flex justify-content-center align-items-center'>
          <Col lg={6}>
            <div className='border border-3 border-primary'></div>
              <Card className='shadow'>
                <Card.Body className='bg-default'>

                  <h2 className='fw-bold mb-2 text-uppercase text-center tcolor-w'>Register</h2>
                  <p className='mb-5 text-center tcolor-w'>Please register with a preferred email and password.</p>
                  <div className='mb-3'>

                    <Form onSubmit={(e) => {
                      e.preventDefault()

                      if (passwordVal !== confirmPassword) {
                        alert(`Passwords do not match. Please try again.`)
                        } else {
                          newAccountEvent(e, {
                            firstName: firstNameVal,
                            lastName: lastNameVal,
                            email: emailVal,
                            password: passwordVal
                          })
                        }
                    }}>

                      <Form.Group className='mb-3' controlId='formBasicName'>
                        <Form.Label className='tcolor-w'>First Name</Form.Label>
                        <Form.Control type='text' placeholder='Enter first name' onChange={(e) => setFirstNameVal(e.target.value)}/>
                      </Form.Group>

                      <Form.Group className='mb-3' controlId='formBasicName'>
                        <Form.Label className='tcolor-w'>Last Name</Form.Label>
                        <Form.Control type='text' placeholder='Enter last name' onChange={(e) => setLastNameVal(e.target.value)}/>
                      </Form.Group>

                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label className='tcolor-w'>Email</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' onChange={(e) => setEmailVal(e.target.value)}/>
                      </Form.Group>

                      <Form.Group className='mb-3' controlId='formBasicPassword'>
                        <Form.Label className='tcolor-w'>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' onChange={(e) => setPasswordVal(e.target.value)}/>
                      </Form.Group>

                      <Form.Group className='mb-3' controlId='formBasicPassword'>
                        <Form.Label className='tcolor-w'>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Confirm password' onChange={(e) => setConfirmPassword(e.target.value)}/>
                      </Form.Group>

                      <div className='d-grid'>
                        <Button variant='primary' type='submit'>Register</Button>
                      </div>

                    </Form>

                    <div className='m-3'>
                      <p className='mb-0 text-center tcolor-w'>Already have an account? <NavLink className='tcolor-w' to='/authenticate'>Login here.</NavLink></p>
                    </div>

                  </div>
                </Card.Body>
              </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}


export default NewAccount