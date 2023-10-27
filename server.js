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

app.post('/authenticate', handlerFunctions.authenticate)

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`))