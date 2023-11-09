import { useEffect } from 'react'

const Category = ({ val, setVal, isEditing }) => {

    useEffect(() => {
        console.log(`Component Rendered: Category`)
    })
    
    switch (val) {
        case 1:
            val = 'Chores'
            break
        case 2:
            val = 'Errands'
            break
        case 3:
            val = 'Appointments'
            break
        case 4:
            val = 'Special Occasions'
            break
        case 5:
            val = 'Misc.'
    }
    
    if (isEditing === true) {
        return (
            <>
                <select name='category' id='reminder_category' onChange={(e) => setVal(e.target.value)}>
                    <option disabled selected={true}>-Choose One-</option>
                    <option value='1'>Chores</option>
                    <option value='2'>Errands</option>
                    <option value='3'>Appointments</option>
                    <option value='4'>Special Occasions</option>
                    <option value='5'>Misc.</option>
                </select>
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

export default Category