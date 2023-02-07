const { DataTypes } = require("sequelize");
const db = require("../../utils/database");

const UserModel = db.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    hashPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1, // always active
    },
  },
  {
    // tableName: 'USERS',
    // timestamps: true,
  }
);

// db.sync({ force: false });

module.exports = UserModel;

//node src/models/Profiles.js
