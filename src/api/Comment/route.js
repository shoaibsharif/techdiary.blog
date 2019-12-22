import { Router } from 'express'
import isAuthenticated from '../../middlewares/isAuthenticated'
import assignUser from '$middlewares/assignUser'

const router = Router()

import { store, destroy, update } from './controller'

router.route('/').post(isAuthenticated, assignUser, store)
router
    .route('/:_id')
    .put(isAuthenticated, update)
    .delete(isAuthenticated, destroy)

export default router
