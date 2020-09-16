const User = require('../data/models/User')
const bcrypt = require('bcryptjs')
const genToken = require('../utils/genToken')

module.exports = {
    registerUser
}

async function registerUser(req, res, next) {
    let userInfo = req.body
    const rounds = +process.env.SALT_ROUNDS

    try {

        // Hashing password 
        const hash = bcrypt.hashSync(userInfo.password, rounds)
        userInfo.password = hash

        // Creating new user document
        const newUser = new User(userInfo)
        const saved = await newUser.save()
        
        // Removing password from document
        let saved_user = {...saved._doc}
        delete saved_user.password

        // Generate JWT Token
        const token = genToken(saved_user)

        // Send response to client
        saved ? 
            res.status(201).json({message: 'User Successfully Registered', token, user: saved_user}) :
            res.status(400).json({message: 'Registration unsuccessful, please try again'}) 

    }catch(err) {
        res.status(500).json({...err})
    }
    
}