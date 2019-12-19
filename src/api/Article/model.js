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

SchemaDefinition.pre(/^find/, function(next) {
    this.populate({
        path: 'author',
        select: '-password',
    })

    next()
})

// todo
SchemaDefinition.virtual('excerpt').get(function() {
    return this.body?.slice(0, 50) + '...'
})
SchemaDefinition.virtual('isEdited').get(function() {
    return this.createdAt != this.updatedAt
})

SchemaDefinition.plugin(uniqueValidator)

export default model('Article', SchemaDefinition)
