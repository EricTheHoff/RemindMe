const DeliverTo = ({ val, setVal, isEditing }) => {
    if (isEditing === true) {
        return (
            <>
                <input
                type='email'
                value={val}
                onChange={(e) => setVal(e.target.value)}
                />
            </>
        )
    } else {
        return (
            <>
                {val}
            </>
        )
    }
}

export default DeliverTo