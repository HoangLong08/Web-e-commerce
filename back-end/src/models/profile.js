const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../utils/database");

const ProfileModel = db.define(
  "Profile",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // value: Nam or Nữ
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {}
);

module.exports = ProfileModel;
