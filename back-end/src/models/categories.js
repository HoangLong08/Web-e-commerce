const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../utils/database");

const CategoryModel = db.define(
  "Category",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    orders: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // unique: true,
      // autoIncrement: true,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = CategoryModel;
