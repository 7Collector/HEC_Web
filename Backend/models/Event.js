const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
    
}, {timestamps: true})

module.exports = mongoose.model('Event', EventSchema)