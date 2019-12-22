import Comment from './model'
import { storeOne, deleteOne, updateOne } from '$factory'

export const store = storeOne({ model: Comment })
export const update = updateOne({ model: Comment })
export const destroy = deleteOne({ model: Comment })
