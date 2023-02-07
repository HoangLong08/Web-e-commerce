const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../utils/database");

const OrderDetailModel = db.define(
  "OrderDetail",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {}
);

module.exports = OrderDetailModel;
