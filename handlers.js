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

    saveToSession: (req, res) => {
        const { auth } = req.body
        req.session.auth = auth
        res.json({ success: true })
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
        const { title, body, deliverTo, deliveryDate, category, userId } = req.body
        const newReminder = await Reminder.create({
            title: title,
            body: body,
            deliverTo: deliverTo,
            deliveryDate: deliveryDate,
            categoryId: category,
            userId: userId
        })

        if(newReminder) {
            res.json({ success: true })
        } else {
            res.json({ success: false })
        }
    },

    checkUser: async (req, res) => {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email: email } })

        if(user) {
            res.json({ success: true })
        } else {
            res.json({ success: false })
        }
    },

    checkStatus: async (req, res) => {
        if(req.session.userId) {
            const user = await User.findByPk(req.session.userId)
            res.send({ email: user.email })
        }
    },

    getId: async (req, res) => {
        const id = req.session.userId
        res.json({ id: id })
    },

    getReminders: async (req, res) => {
        let reminders = []
        let id = req.session.userId
        const remindersFromDB = await Reminder.findAll({ where: { userId: id }})

        reminders.push(remindersFromDB)
        res.send(reminders)
    }
}

export default handlerFunctions