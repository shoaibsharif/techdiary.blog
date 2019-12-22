import { Router } from 'express'
import catchErrors from '../../utils/catchErrors'
import isAuthenticated from '$middlewares/isAuthenticated'
import AppError from '../../utils/AppError'
import assignUser from '../../middlewares/assignUser'
import Article from './model'
const router = Router()

import { index, store, show, destroy, update } from './controller'

const thisIsMyArticle = async (req, res, next) => {
    let article = await Article.findById(req.params._id)

    if (!article) {
        throw new AppError('আরটিক্যাল খুজে পাওয়া যায়নি', 404)
    }

    // if (JSON.stringify(article.author) != JSON.stringify(req.user._id)) {
    //     throw new AppError('এই আরটিক্যালটি আপনার নয়', 401)
    // }

    req.article = article

    next()
}

router
    .route('/')
    .get(catchErrors(index))
    .post(catchErrors(isAuthenticated), assignUser, catchErrors(store))

router.get('/:slug', catchErrors(show))

router
    .route('/:_id')
    .put(
        catchErrors(isAuthenticated),
        catchErrors(thisIsMyArticle),
        catchErrors(update)
    )
    .delete(
        catchErrors(isAuthenticated),
        catchErrors(thisIsMyArticle),
        catchErrors(destroy)
    )

export default router
