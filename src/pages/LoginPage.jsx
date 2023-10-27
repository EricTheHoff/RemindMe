import axios from 'axios'
import Login from '../components/Login.jsx'

const LoginPage = () => {

    const loginEvent = async (e, loginData) => {
        e.preventDefault()
        const response = await axios.post('/authenticate', loginData)

        if(response.data.success) {
            console.log(`Login Successful`)
        }
    }
    return (
    <>
        <h1>Log In</h1>
        <Login userLogsIn={loginEvent}/>
    </>
  )
}

export default LoginPage