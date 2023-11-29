import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap'
import AccountButtons from './AccountButtons.jsx'

const Account = ({
  email,
  setEmail,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  updateUser,
  isEditing,
  setIsEditing }) => {
  // Using a ternary to check if isEditing is set to {true} and render appropriately based off of that.
  // On submission, it will be rejected if the {newPassword} does not match what the user entered for {confirmPassword}.
  return isEditing ? (
    <>
    <Container>
      <Row className='justify-content-center'>
        <Col lg={8}>
          <div className='border border-3 border-primary'></div>
          <Card className='shadow'>
            <Card.Body className='bg-default'>
              <Form onSubmit={(e) => {
                e.preventDefault()

                if (newPassword !== confirmPassword) {
                  alert(`Passwords do not match. Please try again.`)
                } else {
                  updateUser()
                }
              }}>

                <Row>
                  <Col>
                    <Form.Group className='mb-3' controlId='firstName'>
                      <Form.Label className='tcolor-w'>First Name</Form.Label>
                      <Form.Control type='text' placeholder='John' onChange={(e) => setFirstName(e.target.value)}/>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className='mb-3' controlId='lastName'>
                      <Form.Label className='tcolor-w'>Last Name</Form.Label>
                      <Form.Control type='text' placeholder='Doe' onChange={(e) => setLastName(e.target.value)}/>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className='mb-3' controlId='email'>
                        <Form.Label className='tcolor-w'>Email</Form.Label>
                        <Form.Control type='email' placeholder='email@example.com' onChange={(e) => setEmail(e.target.value)}/>
                      </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group className='mb-3' controlId='currentPassword'>
                      <Form.Label className='tcolor-w'>Current Password</Form.Label>
                      <Form.Control type='password' placeholder='Enter current password' onChange={(e) => setCurrentPassword(e.target.value)}/>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className='mb-3' controlId='newPassword'>
                      <Form.Label className='tcolor-w'>New Password</Form.Label>
                      <Form.Control type='password' placeholder='Enter new password' onChange={(e) => setNewPassword(e.target.value)}/>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className='mb-3' controlId='confirmPassword'>
                      <Form.Label className='tcolor-w'>Confirm Password</Form.Label>
                      <Form.Control type='password' placeholder='Confirm new password' onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </Form.Group>
                  </Col>
                </Row>

                <div className='text-center'>
                  <Button variant='primary' type='submit'>Save</Button>
                </div>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>





      {/* <form onSubmit={(e) => {
        e.preventDefault()

        if (newPassword !== confirmPassword) {
        alert(`Passwords do not match. Please try again.`)
        } else {
        updateUser()
        }
      }}>

      <label htmlFor='firstName'>First Name: </label>
        <input
        type='text'
        name='firstName'
        id='firstName'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        />

      <label htmlFor='lastName'>Last Name: </label>
        <input
        type='text'
        name='lastName'
        id='lastName'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        />

      <br/>

      <label htmlFor='email'>Email: </label>
        <input
        type='email'
        name='email'
        id='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

      <br/>

      <label htmlFor='currentPassword'>Current Password: </label>
        <input
        type='password'
        name='currentPassword'
        id='currentPassword'
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        />

      <label htmlFor='newPassword'>New Password: </label>
        <input
        type='password'
        name='newPassword'
        id='newPassword'
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        />

      <label htmlFor='confirmPassword'>Confirm Password: </label>
        <input
        type='password'
        name='confirmPassword'
        id='confirmPassword'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        />

      <br/>

      <button type='submit'>Save</button>

      </form> */}
    </>
  ) : (
    <>
    <Container>
      <Row className='justify-content-center'>
        <Col lg={6}>
          <div className='border border-3 border-primary'></div>
            <Card className='shadow'>
              <Card.Body className='text-center bg-default'>

                <h2 className='mb-3 tcolor-w'>Account Information</h2>
                <p className='tcolor-w'>Name: {firstName} {lastName}</p>
                <p className='tcolor-w'>Email: {email}</p>

                <AccountButtons
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                />

              </Card.Body>
            </Card>
        </Col>
      </Row>
    </Container>
    </>
  )
}


export default Account