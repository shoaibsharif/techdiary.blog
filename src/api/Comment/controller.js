import Comment from './model'

export const store = async (req, res) => {
    // req.body.author = req.user._id
    // let comment = await Comment.create(req.body)
    // res.json(comment)
    res.json(req.user._id)
}
export const update = (req, res) => {}
export const destroy = (req, res) => {}
