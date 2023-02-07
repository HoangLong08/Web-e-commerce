const Category = require("../models/categories");
const Brand = require("../models/brands");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const getListCategoryAdmin = async (req, res) => {
  try {
    const { name } = req.query;
    const getData = await Category.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      include: Brand, // as: define hasMany
    });
    res.status(200).json({
      status: "200",
      message: "get list category success",
      data: getData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

const getDetailCategory = async (req, res) => {
  try {
    const { id } = req.query;
    const getData = await Category.findByPk(id, {
      include: Brand,
    });
    res.status(200).json({
      status: "200",
      message: "get detail category success",
      data: getData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

const postCategoryAdmin = async (req, res) => {
  // create category
  try {
    const { name, listBrand } = req.body;
    const category = await Category.create({
      name: name,
    });
    if (listBrand.length > 0) {
      const brands = listBrand
        .filter((item) => item.name)
        .map((item) => {
          return {
            name: item.name,
            CategoryId: category.id,
          };
        });
      await Brand.bulkCreate(brands);
    }
    res.status(200).json({
      status: "200",
      message: "add category success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

const putCategoryAdmin = async (req, res) => {
  // update category
  try {
    const { idCategory, name, listBrand } = req.body;
    const category = await Category.update(
      {
        name: name,
      },
      {
        where: {
          id: idCategory,
        },
      }
    );

    const brands = listBrand.map((item) => {
      return {
        name: item.name,
        CategoryId: idCategory,
      };
    });
    await Brand.destroy({
      where: {
        CategoryId: idCategory,
      },
    });
    await Brand.bulkCreate(brands);

    // update brand
    res.status(200).json({
      status: "200",
      message: "update category success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

const deleteCategoryAdmin = async (req, res) => {
  // delete category
  try {
    const { idCategory } = req.params;
    const category = await Category.destroy({
      where: {
        id: idCategory,
      },
    });
    // update brand
    res.status(200).json({
      status: "200",
      message: "delete category success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

module.exports = {
  getListCategoryAdmin,
  getDetailCategory,
  postCategoryAdmin,
  putCategoryAdmin,
  deleteCategoryAdmin,
};
