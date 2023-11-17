const DeliveryDate = ({ val, setVal, isEditing }) => {
  const delivery = new Date(val).toLocaleString()

  // Using a ternary to check if isEditing is set to {true} and render appropriately based off of that.
  return isEditing ? (
    <>
      <input
      type='datetime-local'
      value={val}
      onChange={(e) => setVal(e.target.value)}/>
    </>
  ) : (
    <>
      {delivery}
    </>
  )
}


export default DeliveryDate