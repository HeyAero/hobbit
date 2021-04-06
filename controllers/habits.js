const Habit = require("../models/Habit");

async function show(req, res) {
    try {
        const habit = await Habit.findByUserId(req.params.user_id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ err });
    }
}

module.exports = { show , create };