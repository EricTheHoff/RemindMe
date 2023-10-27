import { User, db } from "../src/database/model.js"

console.log(`Syncing DB...`)

await db.sync({ force: true })
console.log(`Seeding DB...`)

let seedUsers = []
const testUser = User.create({
    email: 'test@test.com',
    password: 'test'
})
seedUsers.push(testUser)

const usersInDB = await Promise.all(seedUsers)
console.log(usersInDB)

await db.close()
console.log(`Finished seeding the DB.`)