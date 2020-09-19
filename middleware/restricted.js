require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization
    const secret = process.env.JWT_SECRET

    if(req.decodedJWT){
        next()
    }else if(token){
        jwt.verify(token, secret, (err, decodedJWT) => {
            if(err) {
                res.status(404).json({message: `Invalid Token! You shall not pass`})
            }else{
                res.locals.decodedJWT = decodedJWT
                next()
            }
        }) 
    }else{
        res.status(401).json({ you: "Can't touch that. Looks like you're missing a token" });
    }
}