import AppError from '../utils/AppError'
import catchErrors from '../utils/catchErrors'

const isArticleExists = catchErrors((req, res, next) => {
    throw new AppError('আরটিক্যাল খুজে পাওয়া যায়নি', 404)
    next()
})

export default isArticleExists
