const AccountButtons = ({ isEditing, setIsEditing }) => {
    if (isEditing === true) {
        return (
            <>
            </>
        )
    } else {
        return (
            <>
                <button onClick={() => setIsEditing(true)}>Edit</button>
            </>
        )
    }
}

export default AccountButtons