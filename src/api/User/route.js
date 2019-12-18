import { Router } from 'express'
import catchErrors from '$utils/catchErrors'
import isAuthenticated from '$middlewares/isAuthenticated'

import {
    register,
    login,
    me,
    logout,
    updateProfile,
    updatePassword,
} from './controller'

const router = Router()

router.post('/login', catchErrors(login))
router.post('/register', catchErrors(register))
router.post(
    '/update-profile',
    catchErrors(isAuthenticated),
    catchErrors(updateProfile)
)
router.post(
    '/update-password',
    catchErrors(isAuthenticated),
    catchErrors(updatePassword)
)
router.get('/me', catchErrors(isAuthenticated), catchErrors(me))
router.post('/logout', catchErrors(isAuthenticated), logout)
// router.post('/password-recovery-request')

export default router
