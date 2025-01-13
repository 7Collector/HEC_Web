const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    signature: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    treks: [
        {
            id: {
                type: String,
                required: true
            }
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)
