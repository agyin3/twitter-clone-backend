const mongoose = require('mongoose')
const Follower = require('./Follower')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: { type: String, required: true },
    bio: { type: String, maxlength: 200 },
    profile_img: { type: String },
    private: { type: Boolean, default: false },
    username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 20},
    email: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },
    phone: { type: String, unique: true, sparse: true },
    followers: [Follower.schema],
    following: [Follower.schema],
    liked_tweets: [{ type: Schema.Types.ObjectId, ref: 'Tweet' }],
    tweets: [{type: Schema.Types.ObjectId, ref: 'Tweet'}]

})

module.exports = mongoose.model('User', UserSchema)