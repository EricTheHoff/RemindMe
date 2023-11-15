import axios from 'axios'
import Login from '../components/Login.jsx'
import NewAccount from '../components/NewAccount.jsx'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

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

    const newAccountEvent = async (e, newAccountData) => {
        e.preventDefault()
        const checkUser = await axios.post('/check_user', newAccountData)

        if(checkUser.data.success) {
            alert(`There is already an account registered to that email.`)
        } else {
            const response = await axios.post('/create_account', newAccountData)
            const activeUser = await axios.get('/get_user')
    
            if(response.data.success) {
                dispatch({ type: 'Logged In' })
                dispatch({ type: 'Active User', payload: activeUser.data.userId })
                dispatch({ type: 'First Name Active', payload: activeUser.data.firstName })
                navigate('/reminders')
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