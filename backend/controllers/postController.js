// backend/controllers/postController.js
const { Post, User, Comment, Like } = require('../models');

exports.createPost = async (req, res) => {
  try {
    const { content, imageUrl } = req.body;
    const userId = req.user.id;
    
    const post = await Post.create({ content, imageUrl, UserId: userId });
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating post.' });
  }
};

exports.getFeed = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ['username', 'profilePic'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] },
        { model: Like },
      ],
      order: [['createdAt', 'DESC']],
    });
    
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching feed.' });
  }
};

exports.likePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;
    
    const existingLike = await Like.findOne({ where: { PostId: postId, UserId: userId } });
    if (existingLike) {
      await existingLike.destroy();
      return res.json({ message: 'Post unliked.' });
    } else {
      await Like.create({ PostId: postId, UserId: userId });
      return res.json({ message: 'Post liked.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error liking post.' });
  }
};

exports.addComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Comment content is required.' });
    }
    
    const comment = await Comment.create({ content, PostId: postId, UserId: userId });
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding comment.' });
  }
};
