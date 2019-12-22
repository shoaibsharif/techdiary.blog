import { Router } from 'express'
import catchErrors from '../../utils/catchErrors'
import isAuthenticated from '../../middlewares/isAuthenticated'
import isArticleExists from '../../middlewares/isArticleExists'
import assignUser from '../../middlewares/assignUser'

const router = Router()

import { store } from './controller'

router.route('/').post(isAuthenticated, isArticleExists, assignUser, store)

export default router
