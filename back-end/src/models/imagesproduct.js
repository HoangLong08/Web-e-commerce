const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../utils/database");

const ImageProductModel = db.define(
  "ImageProduct",
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
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = ImageProductModel;
