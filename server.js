import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import ViteExpress from 'vite-express'
import emailjs from '@emailjs/browser'
import nodemailer from 'nodemailer'
import sgMail from '@sendgrid/mail'
import { Reminder } from './src/database/model.js'
import handlerFunctions from './handlers.js'

const app = express()
const port = 8000

sgMail.setApiKey('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')

// const transporter = nodemailer.createTransport({
//     port: 465,
//     host: 'smtp.gmail.com',
//     auth: {
//         user: 'hoffman.dev.testing@gmail.com',
//         pass: 'dev_mtn_testing98!'
//     },
//     secure: true
// })

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
app.post('/check_reminder', handlerFunctions.checkReminder)
app.post('/updated_reminder', handlerFunctions.updatedReminder)
app.post('/delete_sent', handlerFunctions.deleteSent)
app.post('/new_reminder', loginRequired, handlerFunctions.newReminder)
app.post('/logout', loginRequired, handlerFunctions.logout)
app.get('/emails_to_send', handlerFunctions.emailsToBeSent)
// app.post('/test', (req, res) => {
//     const {title, message, category, deliverTo} = req.body
//     emailjs.send("service_dlkmluu", "template_ani6abo", {
//         title: title,
//         message: message,
//         category: category,
//         deliverTo: deliverTo
//     }, "I2V2mOJVRUQv4kj5Q")
//     .then(() => {
//         console.log(`Email has been sent to ${deliverTo}.`)
//         res.json({ success: true })
//     })
//     .catch((error) => {
//         console.log(`An error has occurred: ${error}`)
//         res.json({ success: false })
//     })

// })

const emailsToBeSent = async () => {
    const emails = await Reminder.findAll()
    // console.log(emails)

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
        // emailjs.send("service_dlkmluu", "template_ani6abo", {
        //     title: el.title,
        //     message: el.body,
        //     category: el.categoryId,
        //     deliverTo: el.deliverTo
        // }, "I2V2mOJVRUQv4kj5Q")
        // console.log(`Email has been sent to ${el.deliverTo}`)
        const emailData = {
            to: el.deliverTo,
            from: 'hoffman.dev.testing@gmail.com',
            subject: el.title,
            text: el.body
            // from: 'hoffman.dev.testing@gmail.com',
            // to: el.deliverTo,
            // subject: el.title,
            // text: el.body
        }
        sgMail.send(emailData)
        .then(() => {
            console.log(`Email has been sent to ${el.deliverTo}`)
        })
        .catch((error) => {
            console.log(`An error has occurred: ${error}`)
        })
        // transporter.sendMail(emailData, (error, info) => {
        //     if(error) {
        //         console.log(`An error has occurred: ${error}`)
        //     } else {
        //         console.log(`Info: ${info}`)
        //     }
        // })
    })
}, 30000)

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`))