const Account = ({ email, setEmail, password, setPassword, firstName, setFirstName, lastName, setLastName, isEditing }) => {
    if (isEditing === true) {
        return (
            <>
            <h4>Account Information</h4>
            First Name:
            <input
                type='text'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            Last Name:
            <input
                type='text'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <br/>
            Email Address:
            <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br/>
            New Password:
            <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </>
        )
    } else {
        return (
            <>
                <h4>Account Information</h4>
                <p>Name: {firstName} {lastName}</p>
                <p>Email: {email}</p>
            </>
        )
    }
}

export default Account