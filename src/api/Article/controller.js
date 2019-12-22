import Article from './model'
import { getAll, getOne, deleteOne, storeOne, deleteOne } from '$factory'

export const index = getAll({ model: Article })
export const store = storeOne({ model: Article })
export const show = getOne({
    model: Article,
    searchKey: 'slug',
    population: { path: 'comments author' },
})
export const destroy = deleteOne({ model: Article })
export const update = updateOne({ model: Article })
