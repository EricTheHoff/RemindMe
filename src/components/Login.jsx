import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap'


const Login = ({ userLogsIn }) => {
  const [emailVal, setEmailVal] = useState('')
  const [passwordVal, setPasswordVal] = useState('')


  return (
    <>
    <Container>
      <Row className='vh-50 d-flex justify-content-center align-items-center'>
        <Col lg={6}>
          <div className='border border-3 border-primary'></div>
            <Card className='shadow'>
              <Card.Body>

                <h2 className='fw-bold mb-2 text-uppercase text-center'>Login</h2>
                <p className='mb-5 text-center'>Please enter your email and password.</p>
                <div className='mb-3'>

                  <Form onSubmit={(e) => {
                    userLogsIn(e, {
                      email: emailVal,
                      password: passwordVal
                    })
                  }}>

                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type='email' placeholder='Enter email' onChange={(e) => setEmailVal(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control type='password' placeholder='Enter password' onChange={(e) => setPasswordVal(e.target.value)}/>
                    </Form.Group>

                    <div className='d-grid'>
                      <Button variant='primary' type='submit'>Login</Button>
                    </div>

                  </Form>

                  <div className='mt-3'>
                    <p className='mb-0 text-center'>Don't have an account? <NavLink to='/create_account'>Register here.</NavLink></p>
                  </div>

                </div>
              </Card.Body>
            </Card>
        </Col>
      </Row>
    </Container>
      {/* <form onSubmit={(e) => {
        userLogsIn(e, {
          email: emailVal,
          password: passwordVal
        })
      }}>

      <label htmlFor='email'>Email</label>
        <input
        type='email'
        name='email'
        id='email'
        required
        onChange={(e) => setEmailVal(e.target.value)}
        />

      <label htmlFor='password'>Password</label>
        <input
        type='password'
        name='password'
        id='password'
        required
        onChange={(e) => setPasswordVal(e.target.value)}
        />

      <button type='submit'>Log In</button>

      </form> */}
    </>
  )
}


export default Login