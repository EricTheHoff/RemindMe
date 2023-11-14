const MyRemindersFilter = () => {
  return (
    <>
        <label htmlFor='filter'>Filter by Category:</label>
        <select name='filter' id='filter'>
            <option disabled selected={true}>-Choose One-</option>
            <option value='1'>Chores</option>
            <option value='2'>Errands</option>
            <option value='3'>Appointments</option>
            <option value='4'>Special Occasions</option>
            <option value='5'>Misc.</option>
        </select>
    </>
  )
}

export default MyRemindersFilter