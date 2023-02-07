const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../utils/database");

const EvaluateModel = db.define(
  "Evaluate",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = EvaluateModel;
