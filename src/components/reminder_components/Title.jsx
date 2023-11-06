const Title = ({ val, setVal, isEditing }) => {
    if (isEditing === true) {
        return (
            <>
                <input
                type='text'
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

export default Title