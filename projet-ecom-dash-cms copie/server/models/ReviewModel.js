const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Product = require("./ProductModel");
const User = require("./UsersModel");

// Définir le modèle de la table reviews
const Review = sequelize.define("Review", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  review_date: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
  replies: {
    type: DataTypes.JSONB, // Utilisation du type JSONB pour stocker des données structurées
    allowNull: true,
  },
});

// Définir la relation avec les modèles Product et User
Review.belongsTo(Product, { foreignKey: "productId" });
Review.belongsTo(User, { foreignKey: "userId" });

module.exports = Review;
