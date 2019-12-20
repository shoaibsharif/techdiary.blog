import errorMsg from '$utils/errorMsg'
import formatMongooseValidationErrors from '$utils/formatters/formatMongooseValidationErrors'

export default (error, req, res, next) => {
    /**
     * -----------------------------------------------------------------
     *      Catch Validation Errors
     * -----------------------------------------------------------------
     */

    // error thrown by AppError
    if (error.name === 'AppError') {
        res.status(error.statusCode).json(
            errorMsg({
                type: error.name,
                message: error.message,
                stack: process.env.NODE_ENV === 'dev' ? error.stack : undefined,
            })
        )
    }

    if (error.name === 'ValidationError') {
        let errors = formatMongooseValidationErrors(error.errors)
        res.status(400).json(
            errorMsg({
                errors,
                type: error.name,
                message: 'You have some validation error',
                stack: process.env.NODE_ENV === 'dev' ? error.stack : undefined,
            })
        )
    }

    /**
     * -----------------------------------------------------------------
     *      Internal server Errors
     * -----------------------------------------------------------------
     */

    // res.status(error.statusCode || 500).json(
    //     errorMsg({
    //         type: error.name,
    //         message: error.message,
    //         errors: error?.errors,
    //         stack: process.env.NODE_ENV === 'dev' ? error?.stack : undefined,
    //     })
    // )
}
