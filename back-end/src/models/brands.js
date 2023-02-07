const { DataTypes } = require("sequelize");
const db = require("../../utils/database");

const BrandModel = db.define(
  "Brand",
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
  },
  {
    // Other model options go here
  }
);

module.exports = BrandModel;

//node src/models/users.js
