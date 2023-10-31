import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import Root from './pages/Root.jsx'
import AboutPage from './pages/AboutPage.jsx'
import MyReminders from './pages/MyReminders.jsx'
import AccountPage from './pages/AccountPage.jsx'
import NewReminderPage from './pages/NewReminderPage.jsx'
import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<Root/>}>
    <Route index element={<AboutPage/>}/>

    <Route
    path='/authenticate'
    element={<LoginPage/>}
    />

    <Route
    path='/reminders'
    element={<MyReminders/>}
    />

    <Route
    path='/about'
    element={<AboutPage/>}
    />

    <Route
    path='/new_reminder'
    element={<NewReminderPage/>}
    />

    <Route
    path='/account'
    element={<AccountPage/>}
    />

  </Route>
  )
)

function App() {

  return <RouterProvider router={router}/>
}

export default App
