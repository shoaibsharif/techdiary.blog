import { Router } from 'express'
import catchErrors from '$utils/catchErrors'
import isAuthenticated from '$middlewares/isAuthenticated'
import AppError from '$utils/AppError'

const router = Router()

import {
    articleList,
    createArticle,
    deleteArticle,
    updateArticle,
} from './controller'

const thisIsMyArticle = async (req, res, next) => {
    let article = await Article.findOne({
        _id: req.params.id,
    })

    if (!article) {
        throw new AppError('আরটিক্যাল খুজে পাওয়া যায়নি')
    }

    if (article.author != req.user._id) {
        throw new AppError('এই আরটিক্যালটি আপনার নয়')
    }

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
