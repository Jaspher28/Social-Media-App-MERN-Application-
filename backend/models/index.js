// backend/models/index.js
const sequelize = require('../config/database');
const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
const Like = require('./like');

// Associations
User.hasMany(Post, { onDelete: 'CASCADE' });
Post.belongsTo(User);

User.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(User);

Post.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(Post);

User.hasMany(Like, { onDelete: 'CASCADE' });
Like.belongsTo(User);

Post.hasMany(Like, { onDelete: 'CASCADE' });
Like.belongsTo(Post);

const db = {
  sequelize,
  User,
  Post,
  Comment,
  Like,
};

module.exports = db;
