import axios from 'axios'
import Logout from '../components/Logout'
import { useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const RootPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  const saveToSession = async () => {
    await axios.get('/check_status')
  }

  useEffect(() => {
    saveToSession()
    .then( async () => {
      dispatch({ type: 'Logged In'})
      const activeId = await axios.get('/get_id')
      dispatch({ type: 'Active User', payload: activeId.data.id })
    })
  },[])

  const logoutEvent = async (e) => {
    e.preventDefault()
    const response = await axios.post('/logout')

    if(response.data.success) {
      console.log(`Logout Successful`)
      dispatch({ type: 'Logged Out' })
      dispatch({ type: 'Inactive User' })
      navigate('/')
    }
  }

  if (auth === true) {
    return (
      <>
      <h1>Welcome to Remind Me</h1>
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