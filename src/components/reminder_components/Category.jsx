const Category = ({ val, setVal, isEditing }) => {
  //When {val} is received here, it is a string. Converting {val} to a number so the switch cases can be evaluated correctly.
  val = +val
  switch (val) {
    case 1:
      val = 'Chores'
      break
    case 2:
      val = 'Errands'
      break
    case 3:
      val = 'Appointments'
      break
    case 4:
      val = 'Special Occasions'
      break
    case 5:
      val = 'Misc.'
  }

  // Using a ternary to check if isEditing is set to {true} and render appropriately based off of that.
  return isEditing ? (
    <>
      <select name='category' id='reminder_category' onChange={(e) => setVal(e.target.value)}>
        <option disabled selected={true}>-Choose One-</option>
        <option value='1'>Chores</option>
        <option value='2'>Errands</option>
        <option value='3'>Appointments</option>
        <option value='4'>Special Occasions</option>
        <option value='5'>Misc.</option>
      </select>
    </>
  ) : (
    <>
      {val}
    </>
  )
}


export default Category