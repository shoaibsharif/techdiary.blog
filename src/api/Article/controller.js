import Article from './model'

const articleList = async (req, res) => {
    let data = await Article.find()
    res.json({
        results: data.length,
        data,
    })
}

const createArticle = async (req, res) => {
    req.body.author = req.user._id
    let query = new Article(req.body)
    let article = await query.save()
    res.json(article)
}

const deleteArticle = async (req, res) => {
    let article = await req.article.delete()
    res.json({
        message: 'Article deleted successfully',
        article,
    })
}

const updateArticle = async (req, res) => {
    // let article = await req.article.updateOne(req.body, { new: true })
    let article = await Article.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.json({
        message: 'Article updated successfully',
        article,
    })
}

module.exports = { articleList, createArticle, deleteArticle, updateArticle }
