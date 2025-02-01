const app = require('express')
const router = app.Router()
const passport = require('passport');

router.get('/omniport',
    passport.authenticate('oauth2'));

router.get('/callback', passport.authenticate('oauth2', { failureRedirect: '/' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/api/user/profile');
    })

module.exports = router