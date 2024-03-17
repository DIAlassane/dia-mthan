const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Product = require('./ProductModel');
const User = require('./UsersModel');

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
  },
  review_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Review.belongsTo(Product, { foreignKey: 'productId' });
Review.belongsTo(User, { foreignKey: 'userId' });

module.exports = Review;
