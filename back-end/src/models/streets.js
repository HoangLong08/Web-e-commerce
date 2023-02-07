const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../utils/database");

const StreetModel = db.define(
  "Street",
  {
    //  the reason is to reuse old data
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    street: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Other model Streets go here
  }
);

module.exports = StreetModel;
