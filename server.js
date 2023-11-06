import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import ViteExpress from 'vite-express'
import handlerFunctions from './handlers.js'

const app = express()
const port = 8000

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({ secret: 'asdhgqh4ir3h1213423', saveUninitialized: true, resave: false }))

const loginRequired = (req, res, next) => {
    if (!req.session.userId) {
        res.status(401).json({ error: 'Unauthorized' })
    } else {
        next()
    }
}

app.post('/authenticate', handlerFunctions.authenticate)
app.post('/create_account', handlerFunctions.createAccount)
app.post('/check_user', handlerFunctions.checkUser)
app.get('/get_id', handlerFunctions.getId)
app.get('/get_user', loginRequired, handlerFunctions.getUser)
app.post('/edit_account/:id', loginRequired, handlerFunctions.editAccount)
app.get('/check_status', handlerFunctions.checkStatus)
app.post('/save_session', handlerFunctions.saveToSession)
app.get('/reminders/:id', loginRequired, handlerFunctions.editReminder)
app.post('/update_reminder/:id', loginRequired, handlerFunctions.updateReminder)
app.delete('/delete_reminder/:id', loginRequired, handlerFunctions.deleteReminder)
app.get('/get_reminders', loginRequired, handlerFunctions.getReminders)
app.post('/new_reminder', loginRequired, handlerFunctions.newReminder)
app.post('/logout', loginRequired, handlerFunctions.logout)

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`))