import Article from './model'
import { getAll, getOne, deleteOne, storeOne } from '../factory'

const index = getAll({ model: Article })
const store = storeOne({ model: Article })
const show = getOne({
    model: Article,
    searchKey: 'slug',
    population: { path: 'author' },
})
const destroy = deleteOne({ model: Article })

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
