const City = require("../models/cities");
const District = require("../models/districts");
const Street = require("../models/streets");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const getAllCity = async (req, res) => {
  try {
    const getData = await City.findAll();
    res.status(200).json({
      status: "200",
      message: "get list city success",
      data: getData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

const getListDistrictByIdCity = async (req, res) => {
  try {
    const { id } = req.query;
    const getData = await District.findAll({
      where: {
        CityId: id,
      },
    });
    res.status(200).json({
      status: "200",
      message: "get list city success",
      data: getData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

const getListStreetByIdDistrict = async (req, res) => {
  try {
    const { id } = req.query;
    const getData = await Street.findAll({
      where: {
        DistrictId: id,
      },
    });
    res.status(200).json({
      status: "200",
      message: "get list city success",
      data: getData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

module.exports = {
  getAllCity,
  getListDistrictByIdCity,
  getListStreetByIdDistrict,
};
