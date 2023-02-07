const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../utils/database");

const OrderModel = db.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    numberPhoneRecipient: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    recipient: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {}
);

module.exports = OrderModel;
