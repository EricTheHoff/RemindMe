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
    }
}

export default handlerFunctions