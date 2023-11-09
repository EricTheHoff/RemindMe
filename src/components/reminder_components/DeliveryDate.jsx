const DeliveryDate = ({ val, setVal, isEditing }) => {
    // const delivery = val.toLocaleString()
    if (isEditing === true) {
        return (
            <>
                <input
                type='datetime-local'
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

export default DeliveryDate