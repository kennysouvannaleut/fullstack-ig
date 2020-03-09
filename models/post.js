const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    imgURL: {
        required: true,
        type: String
    },
    description: {
        type: String
    }

})

module.exports = mongoose.model('Post', postSchema)