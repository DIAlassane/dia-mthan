const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Category = require("./CategoryModel");
const Size = require("./SizeModel");
const Color = require("./ColorModel");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  storeId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  supply: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isArchived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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

Product.belongsTo(Category, { foreignKey: "categoryId" });
Product.belongsTo(Size, { foreignKey: "sizeId" });
Product.belongsTo(Color, { foreignKey: "colorId" });

module.exports = Product;
