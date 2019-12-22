import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import validator from 'validator'

const SchemaDefinition = new Schema(
    {
        title: {
            type: String,
            trim: true,
            required: [true, 'Title is required'],
            minlength: [15, 'Title should atleast 15 characters'],
        },
        slug: {
            type: String,
            trim: true,
        },
        tags: {
            type: [String],
            trim: true,
            required: [true, 'Tags is required'],
        },
        coverImage: {
            type: String,
            trim: true,
            validate: [validator.isURL, 'Invalid url'],
        },
        body: {
            type: String,
            trim: true,
            required: [true, 'Article body required'],
            minlength: [150, 'Article should atleast 150 characters'],
        },
        isAnonymous: {
            type: Boolean,
            default: false,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
        author: {
            type: Schema.ObjectId,
            ref: 'User',
            required: [true, 'Author id required'],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
)

const slug = text =>
    text
        .replace(/[#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '')
        .split(' ')
        .join('-') +
    '-' +
    Date.now()

SchemaDefinition.pre('save', function(next) {
    this.slug = slug(this.title)
    this.tags = this.tags[0].split(',')
    next()
})

// SchemaDefinition.pre('')

SchemaDefinition.virtual('excerpt').get(function() {
    return this.body?.slice(0, 50) + '...'
})

SchemaDefinition.virtual('isEdited').get(function() {
    return this.createdAt != this.updatedAt
})

SchemaDefinition.virtual('comments', {
    ref: 'Comment',
    foreignField: 'article',
    localField: '_id',
})

SchemaDefinition.plugin(uniqueValidator)

export default model('Article', SchemaDefinition)
