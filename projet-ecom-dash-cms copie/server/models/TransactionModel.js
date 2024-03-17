const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Product = require('./ProductModel');
const User = require('./UsersModel');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true, 
    primaryKey: true,
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Ajoutez une association à la table Users (la table des utilisateurs)
Transaction.belongsTo(User, { foreignKey: 'userId' });

// Ajoutez une association pour représenter la relation entre Transaction et Product
Transaction.belongsToMany(Product, { through: 'TransactionProducts' });
Product.belongsToMany(Transaction, { through: 'TransactionProducts' });

module.exports = Transaction;
