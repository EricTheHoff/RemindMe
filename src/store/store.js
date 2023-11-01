import { configureStore } from '@reduxjs/toolkit'
import loggedIn from './reducer.js'

const store = configureStore({
    reducer: loggedIn
})

export default store

// const exampleStore = configureStore({
//     reducer: {
//         reducerFunc1,
//         reducerFunc2
//     }
// })