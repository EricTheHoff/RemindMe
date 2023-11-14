import axios from 'axios'
import Login from '../components/Login.jsx'
import NewAccount from '../components/NewAccount.jsx'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const currentId = useSelector((state) => state.activeUser)

    const loginEvent = async (e, loginData) => {
        e.preventDefault()
        const response = await axios.post('/authenticate', loginData)
        const activeUser = await axios.get('/get_user')
        

        if(response.data.success) {
            console.log(`Login Successful`)
            dispatch({ type: 'Logged In' })
            dispatch({ type: 'Active User', payload: activeUser.data.userId })
            // console.log(activeUser.data.userId)
            // console.log(currentId)
            dispatch({ type: 'First Name Active', payload: activeUser.data.firstName })
            navigate('/reminders')
        }
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
                console.log(`Account Created Successfully`)
                dispatch({ type: 'Logged In' })
                dispatch({ type: 'Active User', payload: activeUser.data.id })
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