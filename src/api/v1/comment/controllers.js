const Comment = require("./model")

const store = async (req, res) => {
  let comment = await Comment.create(req.body)
  res.json(comment)
}

const update = (req, res) => {
  res.json({
    mess: "store"
  })
}

const destroy = (req, res) => {
  res.json({
    mess: "store"
  })
}

module.exports = { store, update, destroy }
