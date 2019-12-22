import Comment from './model'
import { storeOne } from '../factory'

export const store = storeOne({ model: Comment })
export const update = (req, res) => {}
export const destroy = (req, res) => {}
