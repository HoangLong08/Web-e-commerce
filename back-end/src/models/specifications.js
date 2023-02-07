const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../utils/database");

const SpeciationModel = db.define(
  "Speciation",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    label: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {}
);

module.exports = SpeciationModel;
