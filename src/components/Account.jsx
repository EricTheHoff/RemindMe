const Account = ({ email, setEmail, isEditing }) => {
    if (isEditing === true) {
        return (
            <>
            <h4>Account Information</h4>
            Email Address:
            <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </>
        )
    } else {
        return (
            <>
                <h4>Account Information</h4>
                Email Address: {email}
            </>
        )
    }
}

export default Account