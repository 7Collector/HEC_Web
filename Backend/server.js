require('dotenv').config()
const express = require('express');
const session = require("express-session");
const passport = require('passport');
const cors = require('cors');
const OAuth2Strategy = require('passport-oauth2');
const axios = require('axios');
const User = require('./models/User');
require('https').globalAgent.options.rejectUnauthorized = false;

// Creating the express app
const app = express()

// Importing Mongoose
const mongoose = require('mongoose')

// passport oauth setup
passport.use(new OAuth2Strategy({
    authorizationURL: 'https://channeli.in/oauth/authorise',
    tokenURL: 'https://channeli.in/open_auth/token/',
    clientID: process.env.CHANNELI_CLIENT_ID,
    clientSecret: process.env.CHANNELI_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/callback'
}, async function (accessToken, refreshToken, profile, cb) {
    try {
        // Make a request to fetch the user's profile
        const response = await axios.get('https://channeli.in/open_auth/get_user_data', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const userData = response.data;

        let enroll = (userData.student.enrolmentNumber) ? userData.student.enrolmentNumber : userData.faculty_member.employee_id;
        let user = await User.findOne({ enroll: userData.student.enrolmentNumber });
        
        if (!user) {
            user = new User({
                name: userData.person.fullName,
                image: 'https://channeli.in/' + userData.person.displayPicture,
                enroll: enroll,
                signature: null,
                //email: userData.contactInformation.emailAddress,
                //number: userData.contactInformation.primaryPhoneNumber,
                email: 'temp',
                number: 'temp',
                treks: []
            });
            await user.save();
        } else {
            user.name = userData.person.fullName;
            user.image = 'https://channeli.in/' + userData.person.displayPicture;
            //user.email = userData.contactInformation.emailAddress;
            //user.number = userData.contactInformation.primaryPhoneNumber;
            await user.save();
        }
        return cb(null, userData);
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        return cb(error);
    }
}));

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
    //console.log(user)
    done(null, user.student.enrolmentNumber);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = User.findOne({ enroll: id });
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// CORS req from forntend
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// Session middlewares
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

// Importing routes
const generalRoutes = require('./routes/genreal')
const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')

//middlewares
app.use(express.json())

// Routes
app.use('/api', generalRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/user', userRoutes)
app.use('/auth', authRoutes)

// Connect to MongoDB and Start Listening for requests on Port
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Server running on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })