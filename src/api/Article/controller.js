import Article from './model'
import { getAll, getOne, storeOne, deleteOne, updateOne } from '$factory'

export const index = getAll({ model: Article, population: 'author' })
export const store = storeOne({ model: Article })
export const show = getOne({
    model: Article,
    searchKey: 'slug',
    population: { path: 'comments author' },
})
export const destroy = deleteOne({ model: Article })
export const update = updateOne({ model: Article })
