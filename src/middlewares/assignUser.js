import catchErrors from '../utils/catchErrors'

const assignUser = catchErrors((req, res, next) => {
    req.body.author = req.user._id
    next()
})
export default assignUser
