import { Router } from 'express'
import catchErrors from '$utils/catchErrors'
import isAuthenticated from '$middlewares/isAuthenticated'
import AppError from '$utils/AppError'
import Article from './model'
const router = Router()

import {
    articleList,
    createArticle,
    deleteArticle,
    updateArticle,
} from './controller'

const thisIsMyArticle = async (req, res, next) => {
    let article = await Article.findById(req.params.id)

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
    .get(catchErrors(articleList))
    .post(catchErrors(isAuthenticated), catchErrors(createArticle))

router
    .route('/:id')
    .put(
        catchErrors(isAuthenticated),
        catchErrors(thisIsMyArticle),
        catchErrors(updateArticle)
    )
    .delete(
        catchErrors(isAuthenticated),
        catchErrors(thisIsMyArticle),
        catchErrors(deleteArticle)
    )

export default router
