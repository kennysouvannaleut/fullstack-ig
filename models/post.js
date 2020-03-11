const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    imgURL: {
        required: true,
        type: String
    },
    description: {
        type: String
    },
    likes: {
        type: Number,
        // required: true,
        default: 0
    },
    user: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Post', postSchema)