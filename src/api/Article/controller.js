import Article from './model'

const index = async (req, res) => {
    let data = await Article.find()
    res.json({
        results: data.length,
        data,
    })
}

const store = async (req, res) => {
    req.body.author = req.user._id
    let query = new Article(req.body)
    let article = await query.save()
    res.json(article)
}

const show = async (req, res) => {
    article = await Article.find()
    res.json(article)
    // res.json({
    //     dd: 45,
    // })
}

const destroy = async (req, res) => {
    let article = await req.article.delete()
    res.json({
        message: 'Article deleted successfully',
        article,
    })
}

const update = async (req, res) => {
    // let article = await req.article.updateOne(req.body, { new: true })
    let article = await Article.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.json({
        message: 'Article updated successfully',
        article,
    })
}

module.exports = { index, store, show, destroy, update }
