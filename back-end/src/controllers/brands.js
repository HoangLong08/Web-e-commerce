const Brand = require("../models/brands");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const postListBrandByIdCategoryAdmin = async (req, res) => {
  try {
    const { idCategory = "" } = req.body;
    const getData = await Brand.findAll({
      where: {
        CategoryId: idCategory,
      },
    });
    res.status(200).json({
      status: "200",
      message: "get list brand by id category success",
      data: getData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

module.exports = { postListBrandByIdCategoryAdmin };
