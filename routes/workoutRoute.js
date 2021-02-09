const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../models");



router.get("/exercise", (req, res) => {

    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

router.get("/api/workouts/", (req, res) => {
    db.Workout.find().sort({ day: -1 }).limit(1).then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.send(err)
    })
});

router.post("/api/workouts/", ({ body }, res) => {
    db.Workout.create(body).then((workout) => {
        res.json(workout);
    });
});
router.put("/api/workouts/:id", (req, res) => {

    const id = req.params.id;

    db.Workout.findByIdAndUpdate(id, {
        $push: { exercises: req.body }
    })
        .then((workout) => {
            res.json(workout);
        })
        .catch((err) => {
            console.log(err);
        });
})

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .sort({ "day": -1 })
        .limit(7)
        .then((workouts) => {
            res.json(workouts);
        })
});


// Export router
module.exports = router;