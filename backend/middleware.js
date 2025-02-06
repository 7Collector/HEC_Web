const loggedIn = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not logged in' });
    }
    next();
};

const secretary = (req, res, next) => {
    if (req.user.role != "secretary") {
        return res.status(401).json({ message: 'Not Secretary' });
    }
    next();
}

module.exports = {loggedIn, secretary};