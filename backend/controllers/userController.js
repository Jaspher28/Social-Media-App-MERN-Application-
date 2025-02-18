// backend/controllers/userController.js
const { User, Post } = require('../models');

exports.getUserProfile = async (req, res) => {
  try {
    const username = req.params.username;
    
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    
    const posts = await Post.findAll({
      where: { UserId: user.id },
      order: [['createdAt', 'DESC']],
    });
    
    res.json({ user: { username: user.username, profilePic: user.profilePic }, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user profile.' });
  }
};

// Endpoint for Suggested Accounts (returns up to 5 users)
exports.getSuggestedUsers = async (req, res) => {
  try {
    const users = await User.findAll({ limit: 5 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching suggested users.' });
  }
};
