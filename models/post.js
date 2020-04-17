const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postedBy: {
        type: Schema.Types.String,
        ref: 'User',
        required: true
    },
    userImg: String,
    imgInfo: {
        required: true,
        type: Object
    },
    description: String,
    votes: {
        type: Number,
        default: 0
    },
    dateAdded: {
        type: Date,
        default: Date.now()
    },
    usersWhoHaveVoted: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: []
    }
})

module.exports = mongoose.model('Post', postSchema)