import { User, Category, db } from "../src/database/model.js"
import bcrypt from 'bcryptjs'

console.log(`Syncing DB...`)

await db.sync({ force: true })
console.log(`Seeding DB...`)

let seedUsers = []
const hash = await bcrypt.hash('test', 12)
const testUser = User.create({
    email: 'test@test.com',
    password: hash,
    firstName: 'Test',
    lastName: 'User'
})
seedUsers.push(testUser)

let seedCategories = []
const chores = Category.create({
    name: 'Chores'
})
const errands = Category.create({
    name: 'Errands'
})
const appts = Category.create({
    name: 'Appointments'
})
const specialOcc = Category.create({
    name: 'Special Occasions'
})
const misc = Category.create({
    name: 'Misc.'
})
seedCategories.push(chores, errands, appts, specialOcc, misc)

const usersInDB = await Promise.all(seedUsers)
console.log(usersInDB)

await db.close()
console.log(`Finished seeding the DB.`)