import { Schema, model, Types } from 'mongoose'

const SchemaDefinition = new Schema({
    title: String,
    slug: String,
    tags: [String],
    coverImage: String,
    body: String,
    isAnonymous: {
        type: Boolean,
        default: false,
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
    // author: {
    //     type: Types.ObjectId,
    //     ref: 'User',
    // },
})

// const slug = text =>
//     text
//         .replace(/[#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '')
//         .split(' ')
//         .join('-') +
//     '-' +
//     Date.now()

// SchemaDefinition.pre('save', function() {
//     if (this.slug) {
//         this.slug = slug(article.title)
//     }
//     this.tags = this.tags.split(',')
// })

SchemaDefinition.pre(/^find/, function() {
    this.select('-body')
    this.populate({
        path: 'author',
        select: '-password',
    })
})

// SchemaDefinition.virtual('excerpt').get(function() {
//     return this.body.slice(0, 12)
// })

export default model('Article', SchemaDefinition)
