const Order = require("../models/orders");
const OrderDetail = require("../models/orderdetail");
const User = require("../models/users");
const City = require("../models/cities");
const District = require("../models/districts");
const Street = require("../models/streets");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const ProductModel = require("../models/products");
const PaymentModel = require("../models/payments");
const PaymentMeThodModel = require("../models/paymentmethods");

const addOrderByUserId = async (req, res) => {
  try {
    // const {
    //   idUser,
    //   name,
    //   phone,
    //   idCity,
    //   idDistrict,
    //   idStreet,
    //   address,
    //   note,
    //   listProduct,
    // } = req.body;
    // console.log("req.body: ", req.body);

    // const addOrder = await Order.create({
    //   address: address,
    //   note: note,
    //   status: "đang chờ thanh toán",
    //   UserId: idUser,
    //   CityId: idCity,
    //   DistrictId: idDistrict,
    //   StreetId: idStreet,
    // });
    // const listProductConvert = listProduct.map((item) => {
    //   return {
    //     quantity: item.quantity,
    //     ProductId: item.id,
    //     OrderId: addOrder.id,
    //   };
    // });
    // const addOrderDetail = await OrderDetail.bulkCreate(listProductConvert);
    // res.status(200).json({
    //   status: "200",
    //   message: "Đặt hàng thành công",
    //   data: {
    //     order: addOrder,
    //     orderDetail: addOrderDetail,
    //   },
    // });
    res.status(200).json({
      status: "200",
      message: "Hệ thống đang nâng cấp",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

const getListOrderAdmin = async (req, res) => {
  try {
    const { nameUser } = req.query;
    const getData = await Order.findAll({
      include: [
        {
          model: User,
          where: {
            [Op.or]: {
              userName: {
                [Op.like]: `%${nameUser}%`,
              },
              email: {
                [Op.like]: `%${nameUser}%`,
              },
            },
          },
        },
      ],
    });
    res.status(200).json({
      status: "200",
      message: "get list order by user id success",
      data: getData,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message || "error server",
      data: null,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { idOrder } = req.params;
    const getData = await Order.findByPk(idOrder, {
      include: [
        {
          model: City,
        },
        {
          model: District,
        },
        {
          model: Street,
        },
        {
          model: OrderDetail,
          include: {
            model: ProductModel,
            attribute: ["id", "name", "thumbnail", "discount", "price"],
          },
        },
        {
          model: PaymentModel,
          include: [PaymentMeThodModel],
          raw: true,
        },
      ],
    });
    res.status(200).json({
      status: "200",
      message: "get detail order by id success",
      data: getData,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message || "error server",
      data: null,
    });
  }
};

module.exports = { addOrderByUserId, getListOrderAdmin, getOrderById };
