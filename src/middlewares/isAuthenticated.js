import jwt from 'jsonwebtoken'
import AppError from '$utils/AppError'
import User from '$api/User/model'

const isAuthenticated = async (req, res, next) => {
    let token = req.cookies.token

    if (!token) {
        if (req.originalUrl.startsWith('/api')) {
            throw new AppError('Permission denied', 403)
        } else {
            res.redirect('/auth/login')
        }
    } else {
        let { userId } = jwt.verify(token, process.env.APP_SECRET)
        const user = await User.findOne({ _id: userId })
        req.user = user
        next()
    }
}

export default isAuthenticated
