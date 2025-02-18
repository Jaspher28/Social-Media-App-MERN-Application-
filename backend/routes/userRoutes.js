// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/suggested', userController.getSuggestedUsers);
router.get('/:username', userController.getUserProfile);

module.exports = router;
