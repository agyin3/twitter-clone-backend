const User = require('../data/models/User')

module.exports = async (req, res, next) => {
    const { following } = res.locals.user
    const { friend_id } = req.body

    try{
        const found = await following.find(friend => friend.user == friend_id)
        const friend = await User.findById(friend_id)

        // If relationship already exists throw Error
        if(found){
            throw Error('User already following')
        }else{
            // If friend found in database call next()
            if(friend){
                next()
            }else{
                // Friend not found in database throw Error
                throw Error('Invalid friend_id provided')
            }
        }
    }catch(err){
        if(err.message.includes('User')){
            res.status(404).json({message: err.message, error: err})
        }else if(err.message.includes('Invalid')){
            res.status(404).json({message: err.message, error: err})
        }else{
            res.status(500).json({...err})
        }
    }
}