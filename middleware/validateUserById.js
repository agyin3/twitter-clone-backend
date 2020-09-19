const User = require('../data/models/User')

module.exports = async (req, res, next) => {
    const { id } = req.params

    try{
        const user = await User.findById(id)

        if(user){ 
            res.locals.user = user
            next()
        }else{
            throw new Error('Invalid user id provided')

        }

    }catch(err){
        if(err.message.includes('Invalid')){
            res.status(404).json({message: err.message, error: err})
        }else {
            res.status(500).json({message: 'There was an error retrieving the user from the database', error: err})
        }
    }
}