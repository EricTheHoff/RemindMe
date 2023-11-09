const DeliveryDate = ({ val, setVal, isEditing }) => {
    const delivery = new Date(val).toLocaleString()

    if (isEditing === true) {
        return (
            <>
                <input
                type='datetime-local'
                value={val}
                onChange={(e) => setVal(e.target.value)}/>
            </>
        )
    } else {
        return (
            <>
                {delivery}
            </>
        )
    }
}

export default DeliveryDate