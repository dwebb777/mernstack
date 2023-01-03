const express = require('express')
const router = express.Router()
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout

} = require('../controllers/workoutController')


//get all of the workouts
router.get('/', getWorkouts)

//get a single workout
router.get('/:id', getWorkout)

// post a new workout
// app.use(express.json()) gives us access to the req.body

router.post('/', createWorkout)

// delete a workout
router.delete('/:id', deleteWorkout)

//update a workout
router.patch('/:id', updateWorkout)

module.exports = router
