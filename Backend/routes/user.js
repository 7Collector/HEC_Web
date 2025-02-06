const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Trek = require('../models/Trek');
const Review = require('../models/Review');
const {loggedIn} = require('../middleware');

/* // Route for fetching upcoming treks in which not registered
router.get('/upcoming', loggedIn, async (req, res) => {
    const user = req.user;
    const today = Date.now()
    const upcomingTreks = await Trek.find({ date: { $gt: today } }) || [];
    upcomingTreks.filter(trek => !user.treks.includes(trek._id) && trek.registration);
    return res.json(user.treks);
}); */

// Route for user's reviews
router.get('/reviews', loggedIn, async (req, res) => {
    const reviews = await Review.find({ userEnroll: req.user.enroll });
    await new Promise(resolve => setTimeout(resolve, 3000));
    if (reviews) {
        return res.json(reviews);
    }
    return res.status(404).json({ message: 'No reviews found' });
});

// Route for fetching profile details
router.get('/profile', loggedIn, async (req, res) => {
    const user = req.user;
    //await new Promise(resolve => setTimeout(resolve, 3000));
    const today = Date.now()
    const upcomingTreks = await Trek.find({ date: { $gt: today } }) || [];
    upcomingTreks.filter(trek => !user.treks.includes(trek._id) && trek.registration);

    return res.json({
        name: user.name,
        email: user.email,
        number: user.number,
        image: user.image,
        signature: user.signature,
        treks: user.treks,
        upcomingTreks: upcomingTreks,
    });
});

// Route for updating profile details
router.post('/profile', loggedIn, async (req, res) => {
    const user = req.user;
    // get all the keys from req.body
    const keys = Object.keys(req.body);
    // update the user object with the keys
    keys.forEach(key => {
        user[key] = req.body[key];
    });
    user.save()
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(500).json({ message: 'Error updating profile', error: err }));
});

router.delete('/reviews/:id', loggedIn, async (req, res) => {
    const review = Review.findById(req.params.id);
    if (review && review.enroll === req.user.enroll) {
        review.remove()
            .then(() => res.json({ message: 'Review deleted successfully' }))
            .catch(err => res.status(500).json({ message: 'Error deleting review', error: err }));
    }
    return res.status(404).json({ message: 'Review not found' });
});

module.exports = router;