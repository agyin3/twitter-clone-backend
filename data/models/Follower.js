const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FollowerSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: Number, required: true} // 1- pending, 2-accepted, 3-blocked
})

module.exports = {
    schema: FollowerSchema,
    Follower: mongoose.model('Follower', FollowerSchema)
}