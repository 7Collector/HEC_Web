const app = require('express')
const router = app.Router()
const Trek = require('../models/Trek')
const Review = require('../models/Review')
const User = require('../models/User')

// Route for fetching upcoming events and Treks
router.get('/upcoming', async (req, res) => {
    const today = Date.now()
    const upcomingTreks = await Trek.find({ date: { $gt: today } }) || [];
    upcomingTreks.filter(trek => trek.registration);
    return res.json(upcomingTreks);
})

router.get('/getAllTreks', async (req, res) => {
    try {
        const today = Date.now()
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skipIndex = (page - 1) * limit;

        const totalTreks = await Trek.countDocuments();
        const totalPages = Math.ceil(totalTreks / limit);

        const upcomingTreks = await Trek.find({ date: { $gt: today } }).select("name image price date difficulty description tagline registration") || [];
        const previousTreks = await Trek.find({ date: { $lt: today } }).select("name image price date difficulty description tagline registration")
            .sort({ dateString: 1 }) // Sort by date
            .skip(skipIndex)
            .limit(limit) || [];

        res.json({
            previousTreks,
            upcomingTreks,
            currentPage: page,
            totalPages,
            totalTreks
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route for fetcing reviews on random
router.get('/reviews', async (req, res) => {
    const reviews = await Review.aggregate([{ $sample: { size: 8 } }]) || [];
    return res.json(reviews);
})
/*
// Route for fetcing reviews using pagination
router.get('/allreviews/:page')((req, res) => {

})
*/
// Route for fetching team
router.get('/team', async (req, res) => {
    const secretary = await User.find({ role: "secretary" }).select("name image") || {};
    const jointSecretary = await User.find({ role: "jointSecretary" }).select("name image") || [];
    const deputySecretary = await User.find({ role: "deputySecretary" }).select("name image") || [];

    return res.json({
        secretary: secretary,
        jointSecretary: jointSecretary,
        deputySecretary: deputySecretary
    });
})

router.get('/getTrek/:trekId', async (req, res) => {
    const trek = await Trek.findById(req.params.trekId, { registartion: 0, upi: 0 });
    if (trek) {
        return res.json(trek);
    }
    return res.status(404).json({ message: 'Trek not found' })
})

module.exports = router