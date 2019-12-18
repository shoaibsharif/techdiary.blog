import Joi from '@hapi/joi'
import Article from './model'

const articleList = async (req, res) => {
    let data = await Article.find()
    res.json({
        data,
    })
}

const createArticle = async (req, res) => {
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        tags: Joi.string().required(),
        coverImage: Joi.string().uri(),
        isPublished: Joi.any(),
        body: Joi.string()
            .min(150)
            .required(),
    })
    await schema.validateAsync(req.body, { abortEarly: false })

    req.body.author = req.user._id
    let article = await Article.create(req.body)
    res.json(article)
}

const deleteArticle = async (req, res) => {}

const updateArticle = async (req, res) => {}

module.exports = { articleList, createArticle, deleteArticle, updateArticle }
