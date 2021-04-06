const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits')
const { verifyToken } = require('../middleware/auth');

module.exports = router;