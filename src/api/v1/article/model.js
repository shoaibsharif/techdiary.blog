const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema(
    {
        title: String,
        body: String,
        author: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

ArticleSchema.pre(/^find/, function() {
    this.populate('author').populate('gallery')
})

ArticleSchema.virtual('comments', {
    ref: 'comment',
    localField: '_id',
    foreignField: 'article',
})

// ArticleSchema.virtual('commentCount' , )

module.exports = mongoose.model('Article', ArticleSchema)
