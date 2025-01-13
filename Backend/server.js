require('dotenv').config()
const express = require('express')

// Creating the express app
const app = express()

// Importing Mongoose
const mongoose = require('mongoose')

// Importing routes
const generalRoutes = require('./routes/genreal')
const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/user')

//middlewares
app.use(express.json())

// Routes
app.use('/', generalRoutes)
app.use('/admin', adminRoutes)
app.use('/user', userRoutes)

// Connect to MongoDB and Start Listening for requests on Port 3000
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Server running on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })