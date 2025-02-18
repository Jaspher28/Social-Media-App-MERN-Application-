// backend/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, postController.createPost);
router.get('/', postController.getFeed);
router.post('/:postId/like', authMiddleware, postController.likePost);
router.post('/:postId/comment', authMiddleware, postController.addComment);

module.exports = router;
