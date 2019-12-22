export const getAll = ({ model }) => async (req, res) => {
    let data = await model.find()
    res.json({
        count: data.length,
        data,
    })
}

export const getOne = ({ model, searchKey = '_id', population }) => async (
    req,
    res
) => {
    let query = model.findOne({ [searchKey]: req.params[searchKey] })
    query.populate({ path: 'author comments' })
    let data = await query
    res.json(data)
}

export const storeOne = ({ model }) => async (req, res) => {
    let data = await model.create(req.body)
    res.status(201).json({
        message: `Stored successfully`,
        data,
    })
}

export const deleteOne = ({ model, searchKey = '_id' }) => async (req, res) => {
    let data = await model.findOneAndDelete({
        [searchKey]: req.params[searchKey],
    })
    res.json({
        message: 'Deleted successfully',
        data,
    })
}
