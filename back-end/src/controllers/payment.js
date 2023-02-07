require("dotenv").config();
const Order = require("../models/orders");
const OrderDetail = require("../models/orderdetail");
const Payment = require("../models/payments");
const Stripe = require("stripe");
const { where } = require("sequelize");
const stripe = Stripe(
  "sk_test_51M6WndDaFRwojde998fBjs1waIZHxwA9j3ijJLNbvDo2IvVaqepK5at0rcHKhuBrg16r2uhNg9OCGFX2cGz0w3jc002C2nDXTL"
);

exports.createPaymentIntent = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const paymentIntentCreate = await stripe.paymentIntents.create({
      amount: amount,
      currency: "vnd",
    });

    res.status(200).json({
      status: "200",
      message: "create order success",
      data: {
        id: paymentIntentCreate.id,
        key: paymentIntentCreate.client_secret,
      },
    });
    // }
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

exports.createPaymentOrder = async (req, res, next) => {
  try {
    const { amount, idOrder } = req.body;
    const addPayment = await Payment.create({
      amount: amount,
      OrderId: idOrder,
      PaymentMethodId: "2", // method payment card
    });
    res.status(200).json({
      status: "200",
      message: "payment success",
      data: addPayment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

exports.createOrderByUserId = async (req, res, next) => {
  try {
    const {
      idUser,
      name,
      phone,
      address,
      note,
      listProduct,
      idCity,
      idDistrict,
      idStreet,
      totalMoneyCart,
      idPayment,
    } = req.body;

    const addOrder = await Order.create({
      numberPhoneRecipient: phone,
      recipient: name,
      address: address,
      note: note,
      status: "Đang xử lý",
      UserId: idUser,
      CityId: idCity,
      DistrictId: idDistrict,
      StreetId: idStreet,
    });

    const listProductConvert = listProduct.map((item) => {
      return {
        quantity: item.quantity,
        ProductId: item.id,
        OrderId: addOrder.id,
      };
    });
    const addOrderDetail = await OrderDetail.bulkCreate(listProductConvert);

    const paymentIntentUpdate = await stripe.paymentIntents.update(idPayment, {
      amount: totalMoneyCart,
      currency: "vnd",
      metadata: { order_id: addOrder.id },
      description: `order id: ${addOrder.id}, customer id: ${idUser}`,
    });

    res.status(200).json({
      status: "200",
      message: "Đang chờ thanh toán",
      data: addOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

exports.updateStatusOrderByOrderId = async (req, res, next) => {
  try {
    const { idOrder, status } = req.body;
    const updateOrder = await Order.update(
      {
        status: status,
      },
      {
        where: {
          id: idOrder,
        },
      }
    );

    res.status(200).json({
      status: "200",
      message: "Thay đổi trạng thái đặt hàng thành công",
      data: updateOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

exports.deleteOrderByOrderId = async (req, res, next) => {
  try {
    const { idOrder } = req.params;
    const deleteOrder = await Order.destroy({
      where: {
        id: idOrder,
      },
    });

    res.status(200).json({
      status: "200",
      message: "Thay đổi trạng thái đặt hàng thành công",
      data: deleteOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};
