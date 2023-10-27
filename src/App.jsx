import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import LogoutPage from './pages/LogoutPage.jsx'
import Root from './pages/Root.jsx'
import WelcomePage from './pages/WelcomePage.jsx'
import MyReminders from './pages/MyReminders.jsx'
import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<Root/>}>
    <Route index element={<WelcomePage/>}/>

    <Route
    path='/authenticate'
    element={<LoginPage/>}
    />

    <Route
    path='/reminders'
    element={<MyReminders/>}
    />

    <Route
    path='/logout'
    element={<LogoutPage/>}
    />

  </Route>
  )
)

function App() {

  return <RouterProvider router={router}/>
}

export default App
