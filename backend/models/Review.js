const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userEnroll: { type: String, ref: 'User' },
    trekId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trek' },
    reviewText: { type: String }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
