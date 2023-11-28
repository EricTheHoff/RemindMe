import { Button, Form } from 'react-bootstrap'


const Logout = ({ userLogsOut }) => {
  return (
    <>
    <Form onSubmit={userLogsOut}>
      <Button variant='primary' type='submit'>Log Out</Button>
    </Form>
    </>
  )
}


export default Logout