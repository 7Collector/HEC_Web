const loggedIn = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not logged in' });
    }
    next();
};

module.exports = loggedIn;