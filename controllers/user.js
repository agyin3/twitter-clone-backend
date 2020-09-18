const User = require('../data/models/User')

async function getAllUsers(req, res, next){
    try {
        const users = await User.find({})
        res.status(200).json({ users })
    } catch (err) {
        res.status(500).json({message: 'There was an error retrieving the users from the database', error: err})
    }
}

async function getSingleUser(req, res, next){
    delete res.locals.user.password

    res.status(200).json({ user: res.locals.user })
}

async function getUserFollowers(req, res, next){
    const { id } = req.params
    const user = { _id: res.locals.user._id, username: res.locals.user.username }

    try {
        const followers = await User.findById(id, 'followers')

        res.status(200).json({ user, followers })
    } catch (error) {
        res.status(500).json({message: 'There was an error retrieving the users from the database', error: err})
    }

}

module.exports = {
    getAllUsers,
    getSingleUser,
    getUserFollowers
}