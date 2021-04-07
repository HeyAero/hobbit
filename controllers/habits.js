const Habit = require('../models/Habit');

async function index (req, res) {
    try {
        const habits = await Habit.all;
        res.status(200).json(habits)
    } catch (err) {
        res.status(500).json({err})
    }
}

async function showUser(req, res) {
    try {
        const user = await Habit.findByUserId(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ err });
    }
}

async function createHabit(req, res) {
      try {
        const habit = await Habit.create(req.body);
        res.status(200).json(habit)
    } catch (err) {
        res.status(422).json({err})
    }
}

async function destroyHabit(req, res) {
      try {
        const habit = await Habit.findHabitById(req.params.id);
        await habit.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({err});
    };
}

module.exports = { index , showUser , createHabit , destroyHabit };