const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TrekSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    registrationCost: {
        type: Number,
        required: true  
    },
    price: {
        type: Number,
        required: true
    },
    upi: {
        type: String,
        required: true
    },
    registrations: [
        {
            name: {
                type: String,
                required: true
            },
            registrationCost: {
                type: Boolean,
                required: true,
                default: false
            },
            price: {
                type: Boolean,
                required: true,
                default: false
            },
            paymentRecieptRegistration: {
                type: String,
                required: true
            },
            paymentRecieptPrice: {
                type: String,
                required: true
            }
        }
    ],
    
    leaders: [
        {
            image: {
                type: String,
                required: true
            },
            enroll: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            instagram: {
                type: String,
                required: true
            }
        }
    ],
    recieptVerifiers: [
        {
            enroll: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }
    ],
    altitude: {
        type: Number,
        required: true
    },
    groupSize: Number,
    tagline: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    dateString: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Moderate", "Challenging", "Hard"],
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    gallery: [
        {
            type: String
        }
    ],
    image: {
        type: String,
        required: true
    },
    report: {
        type: String
    },
    registration: {
        type: Boolean,
        reuired: true,
        default: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Trek', TrekSchema) 