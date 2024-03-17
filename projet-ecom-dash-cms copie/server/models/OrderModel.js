const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Product = require('./ProductModel');

const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true, 
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    storeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    totalPrice: {
      type: DataTypes.FLOAT, 
      defaultValue: 0,
    },
    cart: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
});

Order.belongsTo(Product, { foreignKey: 'productId' }); // Définir la relation avec le modèle Product

module.exports = Order;
