import { useDispatch } from 'react-redux'

const MyReminders = () => {
  const dispatch = useDispatch()

  const getUserId = async () => {
    const response = await axios.get('/get_id')
    dispatch({ type: 'Active User', payload: response.data.id})
  }

  return (
    <div>MyReminders</div>
  )
}

export default MyReminders