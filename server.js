import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import ViteExpress from 'vite-express'
import sgMail from '@sendgrid/mail'
import { Reminder } from './src/database/model.js'
import handlerFunctions from './handlers.js'
import 'dotenv/config'

const app = express()
const port = 8000


app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({ secret: 'asdhgqh4ir3h1213423', saveUninitialized: true, resave: false }))
sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY)

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
app.get('/get_user', handlerFunctions.getUser)
app.get('/get_user', loginRequired, handlerFunctions.getUser)
app.post('/edit_account/:id', loginRequired, handlerFunctions.editAccount)
app.get('/check_status', handlerFunctions.checkStatus)
app.post('/save_session', handlerFunctions.saveToSession)
app.get('/reminders/:id', loginRequired, handlerFunctions.editReminder)
app.post('/update_reminder/:id', loginRequired, handlerFunctions.updateReminder)
app.delete('/delete_reminder/:id', loginRequired, handlerFunctions.deleteReminder)
app.get('/get_reminders', loginRequired, handlerFunctions.getReminders)
app.post('/check_reminder', handlerFunctions.checkReminder)
app.post('/updated_reminder', handlerFunctions.updatedReminder)
app.post('/delete_sent', handlerFunctions.deleteSent)
app.post('/new_reminder', loginRequired, handlerFunctions.newReminder)
app.post('/logout', loginRequired, handlerFunctions.logout)
app.get('/emails_to_send', handlerFunctions.emailsToBeSent)

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