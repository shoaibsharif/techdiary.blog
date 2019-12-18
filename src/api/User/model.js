import { Schema, model } from 'mongoose'
import { hash } from 'bcryptjs'
import { v4 } from 'uuid'

const SchemaDefinition = new Schema({
    name: String,
    username: {
        type: String,
        unique: true,
        index: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        unique: true,
        index: true,
        trim: true,
        lowercase: true,
    },
    bio: String,
    profilePhoto: {
        type: String,
        trim: true,
    },
    password: String,
    passwordResetToken: String,
    emailVerificationToken: String,
    passwordResetExpires: Date,
})

SchemaDefinition.pre('save', async function(next) {
    this.password = await hash(this.password, 10)

    /**
     * Email verification
     */
    let token = v4()
    this.emailVerificationToken = token
    // let url = `${process.env.APP_URL}/auth/email-verify/${token}`
    // let email = new Email(user, url)
    // email.send('welcome', 'Welcome to TechDiary.blog')

    next()
})

export default model('User', SchemaDefinition)
