import axios from 'axios'
import Login from '../components/Login.jsx'
import NewAccount from '../components/NewAccount.jsx'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'


const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // loginEvent: This makes a post to the server and checks the email and password to ensure they match. On success, redux values are updated and the user is logged in.
  const loginEvent = async (e, loginData) => {
    e.preventDefault()
    await axios.post('/authenticate', loginData)

    .then(async () => {
      const activeUser = await axios.get('/get_user')
      dispatch({ type: 'Logged In' })
      dispatch({ type: 'Active User', payload: activeUser.data.userId })
      dispatch({ type: 'First Name Active', payload: activeUser.data.firstName })
      navigate('/reminders')
    })

    .catch((error) => {
      console.log(`The following error has occurred: ${error.request.status}: ${error.request.statusText}`)
      alert(`Login Failed. Please ensure that you've created an account and entered the correct password.`)
    })
  }

  // newAccountEvent: This checks the database to see if a user already exists with the provided email. If they don't exist, create an account for them and log them in.
  const newAccountEvent = async (e, newAccountData) => {
    e.preventDefault()
    const checkUser = await axios.post('/check_user', newAccountData)

    if (checkUser.data.success) {
      alert(`There is already an account registered to that email.`)
    } else {
      const response = await axios.post('/create_account', newAccountData)
      
      if (response.data.success) {
        const activeUser = await axios.get('/get_user')
        dispatch({ type: 'Logged In' })
        dispatch({ type: 'Active User', payload: activeUser.data.userId })
        dispatch({ type: 'First Name Active', payload: activeUser.data.firstName })
        navigate('/reminders')
      } else {
        alert(`Something went wrong! Error: ${response.data.error}`)
      }
    }
  }


  return (
    <>
      <h4>Please log in with your registered email and password.</h4>
      <Login userLogsIn={loginEvent}/>

      <h4>If you do not have an account, please create one here.</h4>
      <NewAccount createAccount={newAccountEvent}/>
    </>
  )
}


export default LoginPage