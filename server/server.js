import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import ViteExpress from 'vite-express'
import sgMail from '@sendgrid/mail'
import { Reminder } from '../src/database/model.js'
import controllerFunctions from './controller.js'
import 'dotenv/config'

// Express Server
const app = express()
const port = 8000

// Middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({ secret: 'asdhgqh4ir3h1213423', saveUninitialized: true, resave: false }))
sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY)

// This function checks if a user is logged in. If they aren't, it sends back a 401.
const loginRequired = (req, res, next) => {
    if (!req.session.userId) {
        res.status(401).json({ error: 'Unauthorized' })
    } else {
        next()
    }
}

// Sever routes for logging in/creating an account.
app.post('/authenticate', controllerFunctions.authenticate)
app.get('/get_user', loginRequired, controllerFunctions.getUser)
app.post('/check_user', controllerFunctions.checkUser)
app.post('/create_account', controllerFunctions.createAccount)

// Server routes for loading/managing reminders.
app.get('/get_reminders', loginRequired, controllerFunctions.getReminders)
app.post('/update_reminder/:id', loginRequired, controllerFunctions.updateReminder)
app.delete('/delete_reminder/:id', loginRequired, controllerFunctions.deleteReminder)

// Server route for creating reminders.
app.post('/new_reminder', loginRequired, controllerFunctions.newReminder)

// Server routes for viewing and editing account information.
app.post('/edit_account/:id', loginRequired, controllerFunctions.editAccount)

//Server route for saving a user's session.
app.get('/check_status', controllerFunctions.checkStatus)

//Server route for logging out.
app.post('/logout', loginRequired, controllerFunctions.logout)

// This function queries my database and creates a filtered array of reminders where the delivery date is between now and 60 seconds from now.
const emailsToBeSent = async () => {
    const emails = await Reminder.findAll()

    const emailQueue = emails.filter((el) => {
        const now = new Date().getTime()
        const deliveryTime = new Date(el.deliveryDate).getTime()
        if(deliveryTime - now <= 60000) {
            return true
        } else {
            return false
        }
    })

    console.log(emailQueue)
    return emailQueue
}

// This interval is running every 60 seconds. On each iteration, it executes the {emailsToBeSent} function.
// For each reminder, it creates an object with email data and sends the email through SendGrid.
// After the email has been sent, the reminder is deleted.
setInterval(async () => {
    const emailNotices = await emailsToBeSent()
    console.log(emailNotices)
    emailNotices.forEach((el) => {
        switch (el.categoryId) {
            case 1:
                el.categoryId = 'Chores'
                break
            case 2:
                el.categoryId = 'Errands'
                break
            case 3:
                el.categoryId = 'Appointments'
                break
            case 4:
                el.categoryId = 'Special Occasions'
                break
            case 5:
                el.categoryId = 'Misc.'
        }
        const emailData = {
            to: el.deliverTo,
            from: {
                name: 'Remind-Me',
                email: 'hoffman.dev.testing@gmail.com'
            },
            templateId: process.env.REACT_APP_SENDGRID_TEMPLATE_KEY,
            dynamicTemplateData: {
                subject: el.title,
                body: el.body,
                category: el.categoryId
            }
        }
        sgMail.send(emailData)
        .then(async () => {
            console.log(`${el.title} has been sent to ${el.deliverTo}`)
            const reminder = await Reminder.findOne({ where: { reminderId: el.reminderId } })
            await reminder.destroy()
            console.log(`The following reminder has been removed from the DB: ${el.title}`)
        })
        .catch((error) => {
            console.log(`An error has occurred: ${error}`)
        })
    })
}, 60000)


ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`))