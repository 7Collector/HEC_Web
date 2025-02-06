const app = require('express')
const router = app.Router()
const Trek = require('../models/Trek')
const {loggedIn, secretary} = require('../middleware');
const User = require('../models/User');


router.get('/profile', loggedIn, async (req, res) => {
    const user = req.user;
    //await new Promise(resolve => setTimeout(resolve, 3000));
    const today = Date.now()
    const upcomingTreks = await Trek.find({ date: { $gt: today } }) || [];
    upcomingTreks.filter(trek => !user.treks.includes(trek._id) && trek.registration);
    const previousTreks = await Trek.find({date: {$lt: today}});
    if(user.role === 'user') {
        return res.status(401).json({message: 'not admin'});
    }
    return res.json({
        name: user.name,
        email: user.email,
        number: user.number,
        image: user.image,
        signature: user.signature,
        treks: previousTreks,
        upcomingTreks: upcomingTreks,
        role: user.role
    });
});

router.get('/team', loggedIn, secretary, async (req, res) => {
    const secretary = await User.find({role: "secretary"}) || {};
    const jointSecretary = await User.find({role: "jointSecretary"}) || [];
    const deputySecretary = await User.find({role: "deputySecretary"}) || [];
    const executive = await User.find({role: "executive"}) || [];

    return res.json({
        secretary: secretary,
        jointSecretary: jointSecretary,
        deputySecretary: deputySecretary,
        executive: executive
    });
})

router.post('/trek', loggedIn, secretary, async (req, res) => {
    try {
        const trek = await Trek.create(req.body);
        return res.json({ message: 'Trek created successfully', trek });
    } catch (err) {
        return res.status(500).json({ message: 'Error creating trek', error: err });
    }
});

module.exports = router