import formatDBValidationErrors from '$formatters/formatDBValidationErrors'
import formatJoiErrors from '$formatters/formatJoiErrors'

import {
    VALIDATION_ERROR,
    INTERNAL_SERVER_ERROR,
    UNCONTROLLED_ERROR,
} from '$utils/errorTypes'

import errorMsg from '$utils/errorMsg'

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

    // Catch validation errors thrown by JOI
    if (error.name === 'ValidationError') {
        res.json(error)
    }

    /**
     * -----------------------------------------------------------------
     *      Internal server Errors
     * -----------------------------------------------------------------
     */

    res.status(error.statusCode || 500).json(
        errorMsg({
            type: error.name,
            message: error.message,
            errors: error?.errors,
            stack: process.env.NODE_ENV === 'dev' ? error?.stack : undefined,
        })
    )
}
