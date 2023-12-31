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
                <Card.Body className='bg-default'>

                  <h2 className='fw-bold mb-2 text-uppercase text-center tcolor-w'>Login</h2>
                  <p className='mb-5 text-center tcolor-w'>Please enter your email and password.</p>
                  <div className='mb-3'>

                    <Form onSubmit={(e) => {
                      userLogsIn(e, {
                        email: emailVal,
                        password: passwordVal
                      })
                    }}>

                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label className='tcolor-w'>Email</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' onChange={(e) => setEmailVal(e.target.value)}/>
                      </Form.Group>

                      <Form.Group className='mb-3' controlId='formBasicPassword'>
                        <Form.Label className='tcolor-w'>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' onChange={(e) => setPasswordVal(e.target.value)}/>
                      </Form.Group>

                      <div className='d-grid'>
                        <Button variant='primary' type='submit'>Login</Button>
                      </div>

                    </Form>

                    <div className='mt-3'>
                      <p className='mb-0 text-center tcolor-w'>Don't have an account? <NavLink className='tcolor-w' to='/create_account'>Register here.</NavLink></p>
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


export default Login