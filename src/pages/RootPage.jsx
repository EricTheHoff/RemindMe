import axios from 'axios'
import Logout from '../components/Logout'
import { useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


const RootPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const firstName = useSelector((state) => state.firstName)

  // saveToSession: This checks the server to see if a session exists for the user who logs in.
  const saveToSession = async () => {
    await axios.get('/check_status')
  }

  // useEffect: This hook runs the saveToSession function, then updates the redux store.
  useEffect(() => {
    saveToSession()

    .then(async () => {
      const activeUser = await axios.get('/get_user')
      dispatch({ type: 'Logged In'})
      dispatch({ type: 'Active User', payload: activeUser.data.userId })
      dispatch({ type: 'First Name Active', payload: activeUser.data.firstName })
    })

    .catch((error) => {
      alert(`Something went wrong! Error: ${error}`)
      console.log(error)
    })
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

  // If a user is logged in, they'll see Nav options. If they aren't, they'll only have an option to login.
  if (auth === true) {
    return (
      <>
        <h1>Welcome to Remind Me, {firstName}</h1>
        <nav>
          <ul>
            <li>
              <NavLink to='/reminders'>My Reminders</NavLink>
            </li>
            <li>
              <NavLink to='/new_reminder'>New Reminder</NavLink>
            </li>
            <li>
              <NavLink to='/account'>My Account</NavLink>
            </li>
            <li>
              <NavLink to='/about'>About</NavLink>
            </li>
            <li>
              <Logout userLogsOut={logoutEvent}/>
            </li>
          </ul>
        </nav>
        <hr/>
        <main>
          <Outlet />
        </main>
      </>
    )
  } else {
    return (
      <>
      <h1>Welcome to Remind Me</h1>
        <nav>
          <ul>
            <li>
              <NavLink to='/authenticate'>Log in</NavLink>
            </li>
          </ul>
        </nav>
        <hr/>
        <main>
          <Outlet />
        </main>
      </>
    )
  }
}


export default RootPage