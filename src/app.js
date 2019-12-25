import express from 'express'
import cors from 'cors'
import cookie from 'cookie-parser'
import morgan from 'morgan'
import catchGlobalError from './middlewares/catchGlobalError'

import fs from 'fs'

/**
 * V1
 */
import apiBootstrap_v1 from './api'

/**
 * Initialize Express application
 */
const app = express()

app.use(express.static('public'))

/**
 * Enable cors
 */

app.use(
    cors({
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200,
        credentials: true,
    })
)

app.use(cookie(process.env.APP_SECRET))

/**
 * Express Logger
 */
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

/**
 * Parse request Body
 */
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/**
 * Apis
 */
// app.get('/status', (req, res) => {
//     res.json({
//         status: '🔥 🔥 Server is working 🔥 🔥',
//         NODE_ENV: process.env.NODE_ENV,
//         database: {
//             dbUrl: process.env.DATABASE_URL,
//             ssl: process.env.DB_SSL,
//         },
//     })
// })

app.use('/api/v1/', apiBootstrap_v1)
app.all('/api/*', (_, res) => {
    res.status(404).json({
        message: 'Invalid api route',
    })
})

app.all('*', (req, res) => {
    let content = fs.readFileSync('./public/index.html')
    res.send(content.toString())
})

app.use(catchGlobalError)

export default app
