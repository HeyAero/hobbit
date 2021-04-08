const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits')
const { verifyToken } = require('../middleware/auth');

router.get('/', habitsController.index)
router.get('/:id', verifyToken, habitsController.showUser)
router.post('/', verifyToken, habitsController.createHabit)
router.patch('/:id', verifyToken, habitsController.updateHabit)
router.delete('/:id', verifyToken, habitsController.destroyHabit)

module.exports = router;