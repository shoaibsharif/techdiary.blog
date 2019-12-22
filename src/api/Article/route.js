import { Router } from 'express'
import isAuthenticated from '$middlewares/isAuthenticated'
import assignUser from '$middlewares/assignUser'

const router = Router()

import { index, store, show, destroy, update } from './controller'

router
    .route('/')
    .get(index)
    .post(isAuthenticated, assignUser, store)

router.get('/:slug', show)

router
    .route('/:_id')
    .put(isAuthenticated, update)
    .delete(isAuthenticated, destroy)

export default router
