const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
    username: {
        type: Schema.Types.String,
        ref: 'User',
        required: true,
        unique: true
    },
    image: {
        type: Object
    },
    about: {
        type: String
    }
})

module.exports = mongoose.model('Profile', profileSchema)