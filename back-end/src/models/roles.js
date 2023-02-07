const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../utils/database");

const RoleModel = db.define(
  "Role",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    //1: "user",2: "staff",3: "admin"
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = RoleModel;
