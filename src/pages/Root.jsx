import axios from 'axios'
import Logout from '../components/Logout'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Root = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  const logoutEvent = async (e) => {
    e.preventDefault()
    const response = await axios.post('/logout')

    if(response.data.success) {
      console.log(`Logout Successful`)
      dispatch({ type: 'Logged Out' })
      navigate('/authenticate')
    }
  }

  if (auth === true) {
    return (
      <>
      <h1>Welcome to Remind Me</h1>
        <nav>
          <ul>
            <li>
              <h4>You are logged in.</h4>
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

export default Root