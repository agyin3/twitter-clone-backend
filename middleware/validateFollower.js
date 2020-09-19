module.exports = async (req, res, next) => {
    const { following } = res.locals.user
    const { friend_id } = req.body

    const found = await following.find(friend => friend.user == friend_id)
    console.log(friend_id)
    
    if(found){
        res.status(404).json({message: 'User already following'})
    }else{
        next()
    }
}