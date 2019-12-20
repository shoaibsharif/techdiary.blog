import { Schema, model } from 'mongoose'

const SchemaDefinition = new Schema(
    {
        body: {
            type: String,
            trim: true,
            required: [true, 'Comment body is required'],
        },
        isAnonymous: {
            type: Boolean,
            default: false,
        },
        article: {
            type: Schema.ObjectId,
            ref: 'Article',
            required: [true, 'Article id is required'],
        },
        author: {
            type: Schema.ObjectId,
            ref: 'User',
            required: [true, 'User id is required'],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
)

export default model('Comment', SchemaDefinition)
