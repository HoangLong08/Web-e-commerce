const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../utils/database");

const CityModel = db.define(
  "City",
  {
    // the reason is to reuse old data
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = CityModel;
