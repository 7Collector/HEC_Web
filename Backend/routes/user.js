const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Review = require('../models/Review');
const loggedIn = require('../middleware');

// Route for fetching upcoming treks in which not registered
router.get('/mytreks', loggedIn, (req, res) => {
    const user = req.user;
    return res.json(user.treks);
});

// Route for user's reviews
router.get('/reviews', loggedIn, async (req, res) => {
    const reviews = await Review.find({ userId: req.user._id });
    if (reviews) {
        return res.json({reviews: reviews});
    }
    return res.status(404).json({ message: 'No reviews found' });
});

// Route for fetching profile details
router.get('/profile', loggedIn, async (req, res) => {
    const user = req.user;
    console.log(user)
    return res.json({
        name: user.name,
        email: user.email,
        number: user.number,
        image: user.image,
        signature: user.signature,
        treks: user.treks,
    });
});

// Route for updating profile details
router.post('/profile', loggedIn, (req, res) => {
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

router.delete('/reviews/:id', loggedIn, (req, res) => {
    const review = Review.findById(req.params.id);
    if (review) {
        review.remove()
            .then(() => res.json({ message: 'Review deleted successfully' }))
            .catch(err => res.status(500).json({ message: 'Error deleting review', error: err }));
    }
    return res.status(404).json({ message: 'Review not found' });
});

module.exports = router;