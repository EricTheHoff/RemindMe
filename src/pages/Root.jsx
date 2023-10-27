import axios from 'axios'
import Logout from '../components/Logout'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const Root = () => {
  const navigate = useNavigate()

  const logoutEvent = async (e) => {
    e.preventDefault()
    const response = await axios.post('/logout')

    if(response.data.success) {
      console.log(`Logout Successful`)
      navigate('/authenticate')
    }
  }

  return (
    <>
    <h1>Welcome to Remind Me</h1>
      <nav>
        <ul>
          <li>
            <NavLink to='/authenticate'>Log In</NavLink>
          </li>
          <li>
            <NavLink to='/reminders'>My Reminders</NavLink>
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
}

export default Root