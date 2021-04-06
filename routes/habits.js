const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits')
const { verifyToken } = require('../middleware/auth');

router.get('/:user_id', verifyToken, habitsController.show)
router.post('/', verifyToken, habitsController.create)
router.delete('/:id', verifyToken, habitsController.destroy)

module.exports = router;