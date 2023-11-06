const AccountButtons = ({ isEditing, changeMode }) => {
    if (isEditing === true) {
        return (
            <>
                <button onClick={changeMode}>Save</button>
            </>
        )
    } else {
        return (
            <>
                <button onClick={changeMode}>Edit</button>
            </>
        )
    }
}

export default AccountButtons