import { Router } from 'express'
import catchErrors from '../../utils/catchErrors'
import isAuthenticated from '../../middlewares/isAuthenticated'
import assignUser from '../../middlewares/assignUser'
// import AppError from '$utils/AppError'
import Article from '../Article/model'
const router = Router()

import { store, update, destroy } from './controller'

// const thisIsMyComment = async (req, res, next) => {
//     let article = await Article.findById(req.params.id)

//     if (!article) {
//         throw new AppError('আরটিক্যাল খুজে পাওয়া যায়নি', 404)
//     }

//     if (JSON.stringify(article.author) != JSON.stringify(req.user._id)) {
//         throw new AppError('এই আরটিক্যালটি আপনার নয়', 401)
//     }
// }

// const articleExists = async (req, res, next) => {
//     const article = await Article.findOne({ _id: req.body.article })
//     // if (!article) throw new AppError('আরটিক্যাল খুজে পাওয়া যায়নি', 404)
//     // next()
//     res.json({
//         rr: article,
//     })
// }

router
    .route('/')
    .post(
        catchErrors(isAuthenticated),
        catchErrors(assignUser),
        catchErrors(store)
    )

// router
//     .route('/:id')
//     .put(
//         catchErrors(isAuthenticated),
//         catchErrors(thisIsMyComment),
//         catchErrors(update)
//     )
//     .delete(
//         catchErrors(isAuthenticated),
//         catchErrors(thisIsMyComment),
//         catchErrors(destroy)
//     )

export default router
