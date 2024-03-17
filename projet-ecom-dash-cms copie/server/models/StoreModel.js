const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Billboard = require('./BillboardModel');
const Category = require('./CategoryModel');
const Product = require('./ProductModel');
const Size = require('./SizeModel');
const Color = require('./ColorModel');
const Order = require('./OrderModel');

const Store = sequelize.define('Store', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
    },
});

Store.hasMany(Billboard, { foreignKey: 'storeId', as: 'billboards' });
Store.hasMany(Category, { foreignKey: 'storeId', as: 'categories' });
Store.hasMany(Product, { foreignKey: 'storeId', as: 'products' });
Store.hasMany(Size, { foreignKey: 'storeId', as: 'sizes' });
Store.hasMany(Color, { foreignKey: 'storeId', as: 'colors' });
Store.hasMany(Order, { foreignKey: 'storeId', as: 'orders' });

module.exports = Store;
