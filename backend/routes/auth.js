const app = require('express')
const router = app.Router()
const passport = require('passport');

router.get('/omniport',
    passport.authenticate('oauth2'));

router.get('/callback', passport.authenticate('oauth2', { failureRedirect: 'http://localhost:5173/' }),
    function (req, res) {
        const next = req.query.next || '/user/dashboard'
        // Successful authentication, redirect home.
        res.redirect('http://localhost:5173' + next);
    });
    
router.get("/auth/logout", (req, res) => {
    req.logout(() => {
        res.redirect("http://localhost:5173/");
    });
});

module.exports = router