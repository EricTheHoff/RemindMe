import { useState } from 'react'
import { Container, Row, Col, Button, Modal, ListGroup, Card } from 'react-bootstrap'

const AboutPage = () => {
  const [show, setShow] = useState(false)

  return (
    <>
    <Container fluid className='text-center'>

      <Row>
        <Col lg={8} className='mx-auto'>
          <Card className='shadow'>
            <Card.Title className='pt-2 fs-2 fst-italic'>What have you forgotten today?</Card.Title>

            <Card.Body>
              This app allows you to create customized reminder notifications for anything; forgot to do the dishes yesterday? No problem! Didn't remember to pick up the kids after work? Bigger problem, but still! Simply create an account and add a reminder for any event relevant to you!
            </Card.Body>

            <div className='text-center'>
              <Button className='mb-3 w-30' variant='primary' onClick={() => setShow(true)}>Want to learn more?</Button>
            </div>
          </Card>
        </Col>
      </Row>


      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title className='text-center'>Remind Me is built with the following technologies:</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ListGroup className='text-center'>
            <ListGroup.Item><a href='https://react.dev/learn'>React</a></ListGroup.Item>
            <ListGroup.Item><a href='https://expressjs.com/'>Express</a></ListGroup.Item>
            <ListGroup.Item><a href='https://www.postgresql.org/about/'>PostgreSQL</a></ListGroup.Item>
            <ListGroup.Item><a href='https://react-bootstrap.netlify.app/docs/getting-started/introduction'>React Bootstrap</a></ListGroup.Item>
            <ListGroup.Item><a href='https://sendgrid.com/en-us/solutions/email-api/smtp-service'>SendGrid</a></ListGroup.Item>
          </ListGroup>
        </Modal.Body>

      </Modal>

    </Container>
    </>
  )
}


export default AboutPage