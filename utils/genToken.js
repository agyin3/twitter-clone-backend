require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (user) => {
    const secret = process.env.JWT_SECRET

    const payload = {
        subject: user._id,
        private: user.private
    }

    const options = {
        expiresIn: process.env.TOKEN_LIFE
    }

    return jwt.sign(payload, secret, options)
}