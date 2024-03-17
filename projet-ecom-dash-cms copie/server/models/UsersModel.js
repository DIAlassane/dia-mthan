const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Role = require("./RoleModel");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 50],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, Infinity],
      },
    },
    url: DataTypes.STRING,
    country: DataTypes.STRING,
    occupation: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    transactions: DataTypes.ARRAY(DataTypes.STRING),
  },
  {
    timestamps: true,
  }
);

User.belongsTo(Role, { foreignKey: "roleId" });

module.exports = User;
