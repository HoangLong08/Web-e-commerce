const Evaluate = require("../models/evaluates");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const getListEvaluateByProductId = async (req, res) => {
  try {
    const { idProduct } = req.params;
    const getData = await Evaluate.findAll({
      where: {
        ProductId: idProduct,
      },
      include: {
        model: User,
        attributes: ["id", "userName"],
      },
      order: [["createdAt", "DESC"]],
      limit: 10,
    });
    res.status(200).json({
      status: "200",
      message: "get list evaluate by id product success",
      data: getData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

const postEvaluateByProductId = async (req, res) => {
  try {
    const { idUser, idProduct, content, rating } = req.body;

    const getData = await Evaluate.create({
      content,
      rating,
      ProductId: idProduct,
      UserId: idUser,
    });
    res.status(200).json({
      status: "200",
      message: "post evaluate by id product success",
      data: getData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

module.exports = { getListEvaluateByProductId, postEvaluateByProductId };
