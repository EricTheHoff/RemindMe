const initialState = { auth: false, activeUser: null, firstName: null }

const loggedIn = (state = initialState, action) => {
    switch (action.type) {
        case 'Logged In':
            return {
                ...state,
                auth: true
            }
        case 'Logged Out':
            return {
                ...state,
                auth: false
            }
        case 'Active User':
            return {
                ...state,
                activeUser: action.payload
            }
        case 'Inactive User':
            return {
                ...state,
                activeUser: null
            }
        case 'First Name Active':
            return {
                ...state,
                firstName: action.payload
            }
        case 'First Name Inactive':
            return {
                ...state,
                firstName: null
            }
        default:
            return state
    }
}

export default loggedIn