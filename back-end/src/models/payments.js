const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../utils/database");

const PaymentModel = db.define(
  "Payment",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {}
);

module.exports = PaymentModel;
