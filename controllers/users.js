const User = require("../models/User");

async function index(req, res) {
    try {
        const users = await User.all;
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ err });
    }
}

async function show(req, res) {
    try {
        const user = await User.findByUsername(req.params.username);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ err });
    }
}

module.exports = { index, show };
