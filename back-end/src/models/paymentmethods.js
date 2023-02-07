const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../utils/database");

const PaymentMeThodModel = db.define(
  "PaymentMethod",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {}
);

module.exports = PaymentMeThodModel;
