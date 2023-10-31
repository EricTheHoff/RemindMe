import session from 'express-session'
import { User, Reminder } from './src/database/model.js'

const handlerFunctions = {
    authenticate: async (req, res) => {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email: email } })

        if(user && user.password === password) {
            req.session.userId = user.userId
            res.json({ success: true })
        } else {
            res.json({ success: false })
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        res.json({ success: true })
    },

    createAccount: async (req, res) => {
        const { email, password } = req.body
        const newUser = await User.create({
            email: email,
            password: password
        })

        if(newUser) {
            req.session.userId = newUser.userId
            res.json({ success: true })
        } else {
            res.json({ success: false })
        }
    },

    newReminder: async (req, res) => {
        const { title, body, deliverTo, deliveryDate } = req.body
        const newReminder = await Reminder.create({
            title: title,
            body: body,
            deliverTo: deliverTo,
            deliveryDate: deliveryDate
        })

        if(newReminder) {
            res.json({ success: true })
        } else {
            res.json({ success: false })
        }
    }
}

export default handlerFunctions