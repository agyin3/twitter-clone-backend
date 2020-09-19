const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TweetSchema = new Schema({
    postedBy: { type: Schema.Types.ObjectId, ref: 'Users', required: true},
    text: { type: String, required: true, maxlength: 200},
    location: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    retweets: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    replies: [{ type: Schema.Types.ObjectId, ref: 'Tweet'}],
    image: String
})

module.exports = mongoose.model('Tweet', TweetSchema)