const Article = require("./model")

const index = async (req, res) => {
  const articles = await Article.find()
  res.json(articles)
}

const store = async (req, res) => {
  let article = await Article.create(req.body)
  res.json(article)
}

const destroy = async (req, res) => {
  let article = await Article.findByIdAndDelete(req.params.id)
  res.json(article)
}
const update = async (req, res) => {
  let article = await Article.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  )

  res.json(article)
}
const show = async (req, res) => {
  let article = await Article.findById(req.params.id).populate("comments")
  res.json(article)
}

module.exports = { index, store, destroy, show, update }
