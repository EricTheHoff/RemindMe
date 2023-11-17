const Title = ({ val, setVal, isEditing }) => {
  // Using a ternary to check if isEditing is set to {true} and render appropriately based off of that.
  return isEditing ? (
    <>
      <input
      type='text'
      value={val}
      onChange={(e) => setVal(e.target.value)}
      />
    </>
  ) : (
    <>
      {val}
    </>
  )
}


export default Title