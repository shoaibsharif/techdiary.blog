import express from 'express'

const router = express.Router()

import UserRoutes from './User/route'
import ArticleRoutes from './Article/route'

router.use('/users', UserRoutes)
router.use('/articles', ArticleRoutes)

export default router
