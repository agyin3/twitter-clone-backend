const User = require('../data/models/User')
const bcrypt = require('bcryptjs')
const genToken = require('../utils/genToken')

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

        // Send response to client if successful
        if(saved){
            res.status(201).json({message: 'User Successfully Registered', token, user: saved_user})
        }else{
            throw new Error('Registration unsuccessful, please try again')
        }
            

    }catch(err) {
        if(err.message.includes('Registration')){
            res.status(400).json({message: err.message, error: err}) 
        }else{
            res.status(500).json({...err})
        }
    }
    
}

async function loginUser(req, res, next) {
    let { username, password } = req.body

    try{
        const user = await User.findOne({ username })
    
        let saved = {...user._doc}

        // Checking if a user with `username` was found 
        // and that the hashed passwords match
        if(saved && bcrypt.compareSync(password, saved.password)) {
            const token = genToken(saved)
            delete saved.password

            res.status(200).json({message: `Welcome Back ${saved.username}`, token, user: saved})
        }else{
            res.status(401).json({message: 'Invalid Credentials'})
        }
             
            
    }catch(err){
        res.status(500).json({...err})
    }
}

module.exports = {
    registerUser,
    loginUser
}