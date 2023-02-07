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
  },
  {
    // Other model options go here
  }
);

module.exports = CategoryModel;
