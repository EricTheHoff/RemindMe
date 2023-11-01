const initialState = { auth: false, activeUser: null }

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
        default:
            return state
    }
}

// const loggedInUser = (state = initialState, action) => {
//     switch (action.type) {
//         case 'Active User':
//             return {
//                 ...state,
//                 activeUser: getUserId()
//             }
//         case 'Inactive User':
//             return {
//                 ...state,
//                 activeUser: null
//             }
//         default:
//             return state
//     }
// }

export default loggedIn