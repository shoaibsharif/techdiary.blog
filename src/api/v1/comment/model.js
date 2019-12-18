const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
    {
        body: String,
        author: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
        },
        article: {
            type: mongoose.Types.ObjectId,
            ref: 'article',
        },
    },
    {
        timestamps: true,
    }
)

commentSchema.pre(/^find/, function(next) {
    this.populate('author')
    next()
})

module.exports = mongoose.model('Comment', commentSchema)
