import Article from './model'

const articleList = async (req, res) => {
    let data = await Article.find()
    res.json({
        data,
    })
}

const createArticle = async (req, res) => {
    req.body.author = req.user._id
    let article = await Article.create(req.body)
    res.json(article)
}

const deleteArticle = async (req, res) => {}

const updateArticle = async (req, res) => {}

module.exports = { articleList, createArticle, deleteArticle, updateArticle }
