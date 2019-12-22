import Comment from './model'
import { storeOne } from '../factory'

export const store = (req, res) => {
    res.json(req.body)
}
