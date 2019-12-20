import { Router } from 'express'
import catchErrors from '$utils/catchErrors'
import isAuthenticated from '$middlewares/isAuthenticated'
import AppError from '$utils/AppError'
import Article from './model'
const router = Router()

import { store, update, destroy } from './controller'

const thisIsMyComment = async (req, res, next) => {
    // let article = await Article.findById(req.params.id)

    // if (!article) {
    //     throw new AppError('আরটিক্যাল খুজে পাওয়া যায়নি', 404)
    // }

    // if (JSON.stringify(article.author) != JSON.stringify(req.user._id)) {
    //     throw new AppError('এই আরটিক্যালটি আপনার নয়', 401)
    // }

    // req.article = article

    next()
}

router.route('/').post(catchErrors(isAuthenticated), catchErrors(store))

router
    .route('/:id')
    .put(
        catchErrors(isAuthenticated),
        catchErrors(thisIsMyComment),
        catchErrors(update)
    )
    .delete(
        catchErrors(isAuthenticated),
        catchErrors(thisIsMyComment),
        catchErrors(destroy)
    )

export default router
