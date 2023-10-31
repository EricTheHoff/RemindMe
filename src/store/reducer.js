const initialState = { auth: false }

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
        default:
            return state
    }
}

export default loggedIn