import Comment from './model'

const store = async (req, res) => {
    req.body.author = req.user._id
    let comment = await Comment.create(req.body)
    res.json(comment)
}
const update = (req, res) => {}
const destroy = (req, res) => {}

module.exports = { store, update, destroy }
