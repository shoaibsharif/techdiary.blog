import catchErrors from '../utils/catchErrors'
import AppError from '$utils/AppError'

export const getAll = ({ model }) =>
    catchErrors(async (req, res) => {
        let data = await model.find()
        res.json({
            count: data.length,
            data,
        })
    })

export const getOne = ({ model, searchKey = '_id', population }) =>
    catchErrors(async (req, res) => {
        let query = model.findOne({ [searchKey]: req.params[searchKey] })

        if (population) query = query.populate(population)

        let data = await query

        if (!data) throw new AppError('Resource not found', 404)

        res.json(data)
    })

export const storeOne = ({ model }) =>
    catchErrors(async (req, res) => {
        let data = await model.create(req.body)
        res.status(201).json({
            message: `Stored successfully`,
            data,
        })
    })

export const deleteOne = ({ model, searchKey = '_id' }) =>
    catchErrors(async (req, res) => {
        let data = await model.findOneAndDelete({
            [searchKey]: req.params[searchKey],
        })
        res.json({
            message: 'Deleted successfully',
            data,
        })
    })
