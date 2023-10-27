import axios from 'axios'
import Login from '../components/Login.jsx'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const navigate = useNavigate()

    const loginEvent = async (e, loginData) => {
        e.preventDefault()
        const response = await axios.post('/authenticate', loginData)

        if(response.data.success) {
            console.log(`Login Successful`)
            navigate('/reminders')
        }
    }
    return (
    <>
        <h4>Please log in with your registered email and password.</h4>
        <Login userLogsIn={loginEvent}/>
    </>
  )
}

export default LoginPage