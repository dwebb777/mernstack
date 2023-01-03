const express = require('express')
const app = express()
require('dotenv').config()
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')

//middleware
app.use(express.json())

// a cool, simple Logger for the console
app.use((req, res, next) => {
    console.log(req.path, req.method, req.body)
    next()
})

//routes even '/' route starts with /api/workouts with this middleware
app.use('/api/workouts', workoutRoutes)


//connect to db
// the app will only start listening when we have connected to mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(' App is connected to MongoDB and App listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })




