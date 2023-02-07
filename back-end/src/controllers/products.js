const Product = require("../models/products");
const Category = require("../models/categories");
const Brand = require("../models/brands");
const Spec = require("../models/specifications");
const ImageProduct = require("../models/imagesproduct");
const jwt = require("jsonwebtoken");
const { Op, Sequelize } = require("sequelize");

const getListProduct = async (req, res) => {
  try {
    const getData = await Category.findAll({
      include: [Product],
    });
    res.status(200).json({
      status: "200",
      message: "get list product success",
      data: getData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

const getDetailProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const getData = await Product.findByPk(id, {
      include: [Spec, Brand, ImageProduct],
    });
    if (getData) {
      res.status(200).json({
        status: "200",
        message: "get detail product success",
        data: getData,
      });
    }
    res.status(404).json({
      status: "404",
      message: "data not found",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

const getListProductByCategoryId = async (req, res) => {
  try {
    const { id } = req.query;
    const getData = await Category.findByPk(id, {
      include: [
        {
          model: Product,
          limit: 10,
          order: Sequelize.literal("rand()"),
        },
      ],
    });
    res.status(200).json({
      status: "200",
      message: "get list product by category id success",
      data: getData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

const getListProductBySearch = async (req, res) => {
  try {
    const limit = 20;
    const {
      keyword = "",
      priceGte = 0,
      priceLte = 999000000,
      brands = "",
      order = "desc",
      page = 1,
    } = req.query;
    let offset = 0 + (page - 1) * limit;

    const getData = await Product.findAndCountAll({
      include: [
        {
          model: Category,
        },
        {
          model: Brand,
          where: {
            name: {
              [Op.like]: `%${brands}%`,
            },
          },
        },
      ],
      where: {
        name: {
          [Op.like]: `%${keyword}%`,
        },
        price: {
          [Op.between]: [priceGte, priceLte],
        },
      },
      // [Op.or]: {
      order: [["price", order]],
      // },
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      status: "200",
      message: "get list product success",
      data: getData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

const getListProductAdmin = async (req, res) => {
  try {
    const { name } = req.query;
    const getData = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      include: [Category, Brand],
    });
    res.status(200).json({
      status: "200",
      message: "get list product success",
      data: getData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

const postProductAdmin = async (req, res) => {
  try {
    const {
      name,
      price,
      thumbnail,
      listImage,
      isDiscount,
      discount,
      specifications,
      description,
      categoryId,
      brandId,
    } = req.body;
    const product = await Product.create({
      name,
      price,
      thumbnail,
      isDiscount,
      discount,
      description,
      CategoryId: categoryId,
      BrandId: brandId,
    });
    if (listImage.length > 0) {
      const images = listImage.map((item) => {
        return {
          name: item.name,
          url: item.url,
          ProductId: product.id,
        };
      });
      await ImageProduct.bulkCreate(images);
    }
    if (specifications.length > 0) {
      const specs = specifications.map((item) => {
        return {
          label: item.label,
          value: item.value,
          ProductId: product.id,
        };
      });
      await Spec.bulkCreate(specs);
    }
    res.status(200).json({
      status: "200",
      message: "add product success",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

const putProductByIdAdmin = async (req, res) => {
  try {
    const {
      idProduct,
      name,
      price,
      thumbnail,
      listImage,
      isDiscount,
      discount,
      specifications,
      description,
      categoryId,
      brandId,
    } = req.body;
    const product = await Product.update(
      {
        name,
        price,
        thumbnail,
        isDiscount,
        discount,
        description,
        CategoryId: categoryId,
        BrandId: brandId,
      },
      {
        where: {
          id: idProduct,
        },
      }
    );

    if (listImage.length > 0) {
      const images = listImage.map((item) => {
        return {
          name: item.name,
          url: item.url,
          ProductId: idProduct,
        };
      });
      await ImageProduct.destroy({
        where: {
          ProductId: idProduct,
        },
      });
      await ImageProduct.bulkCreate(images);
      // Promise.all(
      //   images.map(async (item) => {
      //     return ImageProduct.update(item, {
      //       where: {
      //         ProductId: idProduct,
      //       },
      //     });
      //   })
      // );
    }

    if (specifications.length > 0) {
      const specs = specifications.map((item) => {
        return {
          label: item.label,
          value: item.value,
          ProductId: idProduct,
        };
      });
      await Spec.destroy({
        where: {
          ProductId: idProduct,
        },
      });
      await Spec.bulkCreate(specs);
    }

    res.status(200).json({
      status: "200",
      message: "update product success",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

const deleteProductByIdAdmin = async (req, res) => {
  try {
    const { idProduct } = req.params;
    const getData = await Product.destroy({
      where: {
        id: idProduct,
      },
    });
    res.status(200).json({
      status: "200",
      message: "delete product success",
      data: getData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

const deleteMultipleProductByIdAdmin = async (req, res) => {
  try {
    const { listIdProduct } = req.body;
    const getData = await Product.destroy({
      where: {
        id: listIdProduct,
      },
    });
    res.status(200).json({
      status: "200",
      message: "delete list product success",
      // data: getData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

module.exports = {
  getListProduct,
  getDetailProduct,
  getListProductBySearch,
  getListProductByCategoryId,
  getListProductAdmin,
  postProductAdmin,
  putProductByIdAdmin,
  deleteProductByIdAdmin,
  deleteMultipleProductByIdAdmin,
};
