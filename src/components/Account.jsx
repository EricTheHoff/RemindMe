const Account = ({
    email,
    setEmail,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    updateUser,
    isEditing }) => {
    if (isEditing === true) {
        return (
            <>
            <h4>Account Information</h4>

            <form onSubmit={(e) => {
                e.preventDefault()
                if (newPassword !== confirmPassword) {
                    alert(`Passwords do not match. Please try again.`)
                } else {
                    updateUser()
                }
            }}>
                <label htmlFor='firstName'>First Name: </label>
                <input
                type='text'
                name='firstName'
                id='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                />

                <label htmlFor='lastName'>Last Name: </label>
                <input
                type='text'
                name='lastName'
                id='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                />

                <br/>

                <label htmlFor='email'>Email: </label>
                <input
                type='email'
                name='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <br/>

                <label htmlFor='currentPassword'>Current Password: </label>
                <input
                type='password'
                name='currentPassword'
                id='currentPassword'
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                />

                <label htmlFor='newPassword'>New Password: </label>
                <input
                type='password'
                name='newPassword'
                id='newPassword'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                />

                <label htmlFor='confirmPassword'>Confirm Password: </label>
                <input
                type='password'
                name='confirmPassword'
                id='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <br/>

                <button type='submit'>Save</button>
            </form>
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