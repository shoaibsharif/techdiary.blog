import express from 'express'
import cors from 'cors'
import cookie from 'cookie-parser'
import morgan from 'morgan'
import catchGlobalError from '$utils/catchGlobalError'

/**
 * V1
 */
import apiBootstrap_v1 from './api'

/**
 * Initialize Express application
 */
const app = express()

/**
 * Enable cors
 */
app.use(cors())

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
app.use('/api/v1', apiBootstrap_v1)

// Fallback router
app.all('*', (_, res) => {
    res.status(404).json({
        message: 'Invalid api route',
    })
})

app.use(catchGlobalError)

export default app
