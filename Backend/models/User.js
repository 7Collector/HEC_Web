const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    enroll: {
        type: Number,
        required: true
    },
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
    treks: [
        {
            id: {
                type: String,
                required: true
            }
        }
    ],
    role: {
        type: String,
        enum: ['user', 'executive', 'secretary', 'deputySecretary'],
        default: 'user',
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)
