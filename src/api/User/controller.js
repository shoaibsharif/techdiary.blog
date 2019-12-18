import Joi from '@hapi/joi'
import AppError from '$utils/AppError'
import User from './model'

import jwt from 'jsonwebtoken'
import { compare, hash } from 'bcryptjs'

const register = async (req, res) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        username: Joi.string().required(),
        bio: Joi.string().max(250),
        profilePhoto: Joi.string().max(300),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(5)
            .required(),
        confirm_password: Joi.any()
            .valid(Joi.ref('password'))
            .required(),
    })
    await schema.validateAsync(req.body, { abortEarly: false })

    let user = await User.create(req.body)
    res.json({
        message:
            'সফল ভাবে Registration করেছেন। লগইন করার আগে আপনাকে অবশ্যই ইমেইল verify করতে হবে।',
        user,
    })
}

const login = async (req, res) => {
    const schema = Joi.object().keys({
        user: Joi.string().required(),
        password: Joi.string().required(),
    })
    await schema.validateAsync(req.body, { abortEarly: false })

    let user = await User.findOne({
        $or: [{ username: req.body.user }, { email: req.body.user }],
    })

    /**
     * When user not found
     */
    let invalidc = 'আজেবাজে কিছু না দিয়ে সঠিক তথ্য দিন 🤨 🤨 🤑'

    if (!user) {
        throw new AppError(invalidc)
    }

    /**
     * When email is not varified
     */

    if (user.emailVerificationToken) {
        throw new AppError('দয়া করে আপনার ইমেইল ভেরিফাই করুন')
    }

    /**
     * Finalllly generate cookie
     */

    let isMatched = await compare(req.body.password, user.password)

    if (isMatched) {
        let token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
        res.cookie('token', token, {
            expires: new Date(Date.now() + 365 * 24 * 3600 * 1000),
            httpOnly: true,
        })

        res.locals.user = user
        res.json({
            message: 'ওয়াও 😱😱😱 , আপনি সফল ভাবে লগইন করে ফেলেছেন 🎉🙏',
        })
    } else {
        res.status(400)
        throw new AppError(invalidc)
    }

    res.json(user)
}

const me = async (req, res) => {
    res.json(req.user)
}

const logout = (req, res) => {
    res.clearCookie('token')
    res.json({
        message: 'সফল ভাবে লগআউট হয়েছে!!!',
    })
}

const updateProfile = async (req, res) => {
    const schema = Joi.object().keys({
        name: Joi.string(),
        username: Joi.string(),
        profilePhoto: Joi.string().uri(),
        bio: Joi.string().max(250),
        email: Joi.string().email(),
    })
    await schema.validateAsync(req.body, { abortEarly: false })

    let user = await User.findOneAndUpdate({ _id: req.user._id }, req.body, {
        new: true,
    })
    res.json({
        message: 'আপনার প্রোফাইলের তথ্য হালনাগাদ হয়েগেছে',
        user,
    })
}

const updatePassword = async (req, res) => {
    const schema = Joi.object().keys({
        password: Joi.string()
            .min(5)
            .required(),
        confirm_password: Joi.any()
            .valid(Joi.ref('password'))
            .required(),
    })
    await schema.validateAsync(req.body, { abortEarly: false })

    let password = await hash(req.body.password, 10)

    await User.findByIdAndUpdate(req.user._id, { password }, { new: true })

    res.json({
        message: 'পাসওয়ার্ড পরিবর্তন হয়েছে',
    })
}

export { register, login, me, logout, updateProfile, updatePassword }
