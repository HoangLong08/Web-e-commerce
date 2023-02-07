const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../utils/database");

const ProductModel = db.define(
  "Product",
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

    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },

    // isOption: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: 0,
    // },

    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    isDiscount: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },

    discount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    // inventory: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   defaultValue: 0,
    // },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // criteria: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
  },
  {
    // Other model options go here
  }
);

module.exports = ProductModel;
