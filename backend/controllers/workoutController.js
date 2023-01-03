const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')
const { rawListeners } = require('../models/workoutModel')

//get ALL workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1}) // new workouts at the top

    res.status(200).json(workouts)
}

// get a SINGLE workout
const getWorkout = async (req, res) => {
    const {id} = req.params
// a check for mongoDB id validation / if a gibberish id is entered app will crash without it
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    
    const workout = await Workout.findById(id)

    if(!workout) {
        // the return will stop the following 200 staus code from running
        return res.status(404).json({error: 'No such workout found'})
    }

    res.status(200).json(workout)
}


// create a new workout

const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all fields', emptyFields})
    }



    
    // using the Workout model to create a new document in MongoDB / Adding a document
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}



// delete a workout
const deleteWorkout = async (req, res) => {
const {id} = req.params

if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
}

const workout = await Workout.findOneAndDelete({_id: id})

if(!workout) {
    return res.status(404).json({error: 'No such workout found'})
}

res.status(200).json(workout)

}
// update a workout

const updateWorkout = async (req, res) => {
    const {id} = req.params

if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
}

const workout = await Workout.findOneAndUpdate({_id: id, ...req.body}
)

if (!workout) {
    res.status(400).json({error: 'No such workout'})
  }
 
  res.status(200).json(workout)
}



module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}