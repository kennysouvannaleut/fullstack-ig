const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
    username: {
        type: Schema.Types.String,
        ref: 'User',
        required: true,
        unique: true
    },
    img: {
        type: Object
    },
    bio: {
        type: String
    }
})

module.exports = mongoose.model('Profile', profileSchema)