const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

//the Schema defines the stucture of data, the model is what we call the different methods on and work with.

module.exports = mongoose.model('Workout', workoutSchema)



