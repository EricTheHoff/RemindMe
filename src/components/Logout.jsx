const Logout = ({ userLogsOut }) => {
  return (
    <>
      <form onSubmit={userLogsOut}>
        <button type='submit'>Log Out</button>
      </form>
    </>
  )
}


export default Logout