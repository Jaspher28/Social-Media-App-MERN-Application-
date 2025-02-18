// backend/models/like.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Like = sequelize.define('Like', {
  // Associations will create foreign keys automatically.
});

module.exports = Like;
