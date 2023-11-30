import axios from 'axios'
import Logout from '../components/Logout'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


const RootPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const firstName = useSelector((state) => state.firstName)

  // saveToSession: This checks the server to see if a session exists for the user who logs in. Redux variables are updated based on if there is an active session or not.
  const saveToSession = async () => {
    const response = await axios.get('/check_status')

    if (!response.data.success) {
      dispatch({ type: 'Logged Out'})
      dispatch({ type: 'Inactive User'})
      navigate('/')
    } else {
      // console.log(`This get_user fired`)
      const activeUser = await axios.get('/get_user')
      dispatch({ type: 'Logged In'})
      dispatch({ type: 'Active User', payload: activeUser.data.userId })
      dispatch({ type: 'First Name Active', payload: activeUser.data.firstName })
    }
  }

  // useEffect: This hook runs the saveToSession function.
  useEffect(() => {
    saveToSession()
  },[])

  // logoutEvent: This will check the server and destroy the session associated with the user. On success, it will update the redux store.
  const logoutEvent = async (e) => {
    e.preventDefault()
    const response = await axios.post('/logout')
    
    if (response.data.success) {
      dispatch({ type: 'Logged Out' })
      dispatch({ type: 'Inactive User' })
      navigate('/')
    } else {
      alert(`Something went wrong! Error: ${response.data.error}`)
      console.log(response.data.error)
    }
  }

  // If a user is logged in, they'll see Nav options. If they aren't, they'll only have an option to login and view the About page.
  if (auth === true) {
    return (
      <>
        <Navbar expand='lg' className='navbar-dark navbar-custom'>
          <Container fluid>
            <Navbar.Brand href='/'>
              <img
                alt=''
                src='/reminder-icon.png'
                width='30'
                height='30'
                className='d-inline-block align-top'
              />
              Remind Me
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>

                <LinkContainer to='/reminders'>
                  <Nav.Link>My Reminders</Nav.Link>
                </LinkContainer>

                <LinkContainer to='/new_reminder'>
                  <Nav.Link>New Reminder</Nav.Link>
                </LinkContainer>

                <LinkContainer to='/account'>
                  <Nav.Link>My Account</Nav.Link>
                </LinkContainer>

                <LinkContainer to='/about'>
                  <Nav.Link>About</Nav.Link>
                </LinkContainer>
              </Nav>

              <Nav>
                <Logout userLogsOut={logoutEvent}/>
              </Nav>

            </Navbar.Collapse>
          </Container>
        </Navbar>

        <h1 className='text-center py-4 tstroke'>Welcome to Remind Me, {firstName}</h1>

        <main>
          <Outlet />
        </main>
      </>
    )
  } else {
    return (
      <>
        <Navbar expand='lg' className='navbar-dark navbar-custom'>
          <Container fluid>
            <Navbar.Brand href='/'>
              <img
                alt=''
                src='/reminder-icon.png'
                width='30'
                height='30'
                className='d-inline-block align-top'
              />
              Remind Me
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'></Nav>
              <Nav>

                <LinkContainer to='/authenticate'>
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>

              </Nav>

            </Navbar.Collapse>
          </Container>
        </Navbar>


        <h1 className='text-center py-3 tstroke'>Welcome to Remind Me</h1>
        
        <main>
          <Outlet />
        </main>
      </>
    )
  }
}


export default RootPage