import { User, Reminder } from '../src/database/model.js'
import bcrypt from 'bcryptjs'

// 
const controllerFunctions = {
  authenticate: async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email: email } })

    if(!user) {
      res.json({ success: false })
    } else {
      const hashMatch = await bcrypt.compare(password, user.password)
      if (user && hashMatch === true) {
        req.session.userId = user.userId
        res.json({ success: true })
      } else {
        res.json({ success: false })
      }
    }
  },
  
  getUser: async (req, res) => {
    let id = req.session.userId
    const user = await User.findOne({ where: { userId: id } })

    res.send(user)
  },
    
  checkUser: async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ where: { email: email } })

    if(user) {
        res.json({ success: true })
    } else {
        res.json({ success: false })
    }
  },

  createAccount: async (req, res) => {
    const { email, password, firstName, lastName } = req.body

    const salt = bcrypt.genSaltSync(12)
    const hash = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash
      })
      
      if(newUser) {
        req.session.userId = newUser.userId
        res.status(200).json({ success: true })
      } else {
        res.status(400).json({ success: false })
      }
  },
      
  getReminders: async (req, res) => {
    let id = req.session.userId
    const remindersFromDB = await Reminder.findAll({ where: { userId: id } })
    console.log(remindersFromDB)
    
    res.send(remindersFromDB)
  },
  
  updateReminder: async (req, res) => {
    const { id } = req.params
    const { title, body, deliverTo, deliveryDate, category } = req.body
    const reminder = await Reminder.findOne({ where: { reminderId: id } })
    
    reminder.title = title
    reminder.body = body
    reminder.deliverTo = deliverTo
    reminder.deliveryDate = deliveryDate
    reminder.categoryId = category
    
    await reminder.save()
    res.json({ success: true })
  },

  deleteReminder: async (req, res) => {
    const { id } = req.params
    const reminder = await Reminder.findOne({ where: { reminderId: id } })
    await reminder.destroy()

    res.json({ success: true })
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

  editAccount: async (req, res) => {
    const { id } = req.params
    const { email, currentPassword, newPassword, firstName, lastName } = req.body
    const user = await User.findOne({ where: { userId: id } })
    const hashMatch = await bcrypt.compare(currentPassword, user.password)

    if (newPassword === '') {
        user.email = email
        user.firstName = firstName
        user.lastName = lastName
        await user.save()
        res.json({ success: true })
    } else if (hashMatch === false) {
        res.json({ success: false })
    } else {
        const salt = bcrypt.genSaltSync(12)
        const hash = await bcrypt.hash(newPassword, salt)

        user.email = email
        user.password = hash
        user.firstName = firstName
        user.lastName = lastName
        await user.save()
        res.json({ success: true })
    }
  },

  checkStatus: async (req, res) => {
    if(req.session.userId) {
        const user = await User.findByPk(req.session.userId)
        res.send({ email: user.email, success: true })
    } else {
      res.json({ success: false })
    }
  },

  logout: (req, res) => {
    req.session.destroy()
    res.json({ success: true })
  },
}


export default controllerFunctions