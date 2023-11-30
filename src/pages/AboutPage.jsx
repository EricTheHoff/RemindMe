import { useState } from 'react'
import { Container, Row, Col, Button, Modal, ListGroup, Card } from 'react-bootstrap'

const AboutPage = () => {
  const [show, setShow] = useState(false)

  return (
    <>
      <Container fluid className='text-center'>
        <Row>
          <Col lg={8} className='mx-auto'>
            <div className='border border-3 border-primary'></div>
              <Card className='shadow bg-default'>
                <div className='tcolor-w'>
                  <Card.Title className='pt-2 fs-2 fst-italic'>What have you forgotten today?</Card.Title>
                </div>

                <Card.Body>
                  <div className='tcolor-w'>
                    <p>Remind Me allows you to create customized reminder notifications for anything!</p>
                    <p>Forgot to do the dishes yesterday? No problem! Didn't remember to pick up the kids after work? That might be a problem, but Remind Me can help with that!</p>
                    <p>Simply create an account and add a reminders for anything you need!</p>
                  </div>
                </Card.Body>

                <div className='text-center'>
                  <Button className='mb-3 w-30' variant='primary' onClick={() => setShow(true)}>Want to learn more?</Button>
                </div>
              </Card>
          </Col>
        </Row>

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton className='bg-default tcolor-w'>
            <Modal.Title className='text-center'>Remind Me is built with the following technologies:</Modal.Title>
          </Modal.Header>

          <Modal.Body className='bg-default'>
            <ListGroup className='text-center'>
              <ListGroup.Item className='bg-default'><a className='tcolor-w' href='https://react.dev/learn'>React</a></ListGroup.Item>
              <ListGroup.Item className='bg-default'><a className='tcolor-w' href='https://expressjs.com/'>Express</a></ListGroup.Item>
              <ListGroup.Item className='bg-default'><a className='tcolor-w' href='https://www.postgresql.org/about/'>PostgreSQL</a></ListGroup.Item>
              <ListGroup.Item className='bg-default'><a className='tcolor-w' href='https://react-bootstrap.netlify.app/docs/getting-started/introduction'>React Bootstrap</a></ListGroup.Item>
              <ListGroup.Item className='bg-default'><a className='tcolor-w' href='https://sendgrid.com/en-us/solutions/email-api/smtp-service'>SendGrid</a></ListGroup.Item>
            </ListGroup>
          </Modal.Body>

        </Modal>

      </Container>
    </>
  )
}


export default AboutPage