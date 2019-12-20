import express from 'express'

const router = express.Router()

import UserRoutes from './User/route'
import ArticleRoutes from './Article/route'
import CommentRoutes from './Comment/route'

router.use('/users', UserRoutes)
router.use('/articles', ArticleRoutes)
router.use('/comments', CommentRoutes)

export default router
