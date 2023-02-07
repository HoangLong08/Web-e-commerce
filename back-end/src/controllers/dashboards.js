const User = require("../models/users");
const Product = require("../models/products");
const Order = require("../models/orders");
const Category = require("../models/categories");
const Payment = require("../models/payments");

const jwt = require("jsonwebtoken");
const { Op, col, fn, where, literal } = require("sequelize");
const db = require("../../utils/database");
/**
 * 
 * @param {SELECT SUM(IF(month = 'Jan', total, 0)) AS 'Jan', SUM(IF(month = 'Feb', total, 0)) AS 'Feb', SUM(IF(month = 'Mar', total, 0)) AS 'Mar', SUM(IF(month = 'Apr', total, 0)) AS 'Apr', SUM(IF(month = 'May', total, 0)) AS 'May', SUM(IF(month = 'Jun', total, 0)) AS 'Jun', SUM(IF(month = 'Jul', total, 0)) AS 'Jul', SUM(IF(month = 'Aug', total, 0)) AS 'Aug', SUM(IF(month = 'Sep', total, 0)) AS 'Sep', SUM(IF(month = 'Oct', total, 0)) AS 'Oct', SUM(IF(month = 'Nov', total, 0)) AS 'Nov', SUM(IF(month = 'Dec', total, 0)) AS 'Dec', SUM(total) AS total_yearly FROM ( SELECT DATE_FORMAT(createdAt, "%b") AS month, COUNT(payments.OrderId) as total FROM payments WHERE createdAt <= NOW() and createdAt >= Date_add(Now(),interval - 12 month) GROUP BY DATE_FORMAT(createdAt, "%m-%Y")) as sub;
} req 
 * @param {*} res 
 */
const getDashboardAdmin = async (req, res) => {
  try {
    const { idCategory = "" } = req.body;
    const getPayment = await Payment.findAll({
      attributes: [[fn("sum", col("amount")), "total_amount"]],
      // raw: true,
    });
    const [getOrderByMonth] = await db.query(`
      SELECT SUM(IF(month = 'Jan', total, 0)) AS 'Jan', SUM(IF(month = 'Feb', total, 0)) AS 'Feb', 
      SUM(IF(month = 'Mar', total, 0)) AS 'Mar', SUM(IF(month = 'Apr', total, 0)) AS 'Apr', 
      SUM(IF(month = 'May', total, 0)) AS 'May', SUM(IF(month = 'Jun', total, 0)) AS 'Jun', 
      SUM(IF(month = 'Jul', total, 0)) AS 'Jul', SUM(IF(month = 'Aug', total, 0)) AS 'Aug',
      SUM(IF(month = 'Sep', total, 0)) AS 'Sep', SUM(IF(month = 'Oct', total, 0)) AS 'Oct', 
      SUM(IF(month = 'Nov', total, 0)) AS 'Nov', SUM(IF(month = 'Dec', total, 0)) AS 'Dec'
      FROM ( SELECT DATE_FORMAT(createdAt, "%b") AS month, COUNT(payments.OrderId) as total 
      FROM payments WHERE createdAt <= '2023-12-30' and createdAt >= Date_add('2023-12-30',interval - 12 month) 
      GROUP BY DATE_FORMAT(createdAt, "%m-%Y")) as sub
    `);
    // 2023-12-30 => Now()
    const [getUserByMonth] = await db.query(`
    SELECT SUM(IF(month = 'Jan', total, 0)) AS 'Jan', SUM(IF(month = 'Feb', total, 0)) AS 'Feb', 
    SUM(IF(month = 'Mar', total, 0)) AS 'Mar', SUM(IF(month = 'Apr', total, 0)) AS 'Apr', 
    SUM(IF(month = 'May', total, 0)) AS 'May', SUM(IF(month = 'Jun', total, 0)) AS 'Jun', 
    SUM(IF(month = 'Jul', total, 0)) AS 'Jul', SUM(IF(month = 'Aug', total, 0)) AS 'Aug',
    SUM(IF(month = 'Sep', total, 0)) AS 'Sep', SUM(IF(month = 'Oct', total, 0)) AS 'Oct', 
    SUM(IF(month = 'Nov', total, 0)) AS 'Nov', SUM(IF(month = 'Dec', total, 0)) AS 'Dec'
    FROM ( SELECT DATE_FORMAT(createdAt, "%b") AS month, COUNT(users.id) as total 
    FROM users WHERE createdAt <= '2023-12-30' and createdAt >= Date_add('2023-12-30',interval - 12 month) 
    GROUP BY DATE_FORMAT(createdAt, "%m-%Y")) as sub
    `);

    const getDataProduct = await Product.findAndCountAll({
      attributes: ["id", "name", "price", "discount"],
    });
    const getDataUser = await User.findAndCountAll();
    const getDataOrder = await Order.findAndCountAll();
    const getDataCategory = await Category.findAndCountAll({
      include: [Product],
    });

    let objectKeysOrder = Object.keys(getOrderByMonth?.[0]);

    let answerOrder = objectKeysOrder.map((value) => {
      return { month: value, value: getOrderByMonth?.[0][value] };
    });

    let objectKeysUser = Object.keys(getOrderByMonth?.[0]);

    let answerUser = objectKeysUser.map((value) => {
      return { month: value, value: getUserByMonth?.[0][value] };
    });

    res.status(200).json({
      status: "200",
      message: "get dashboard success",
      data: {
        totalRevenue: getPayment,
        getOrderByMonth: answerOrder,
        getUserByMonth: answerUser,
        products: getDataProduct,
        users: getDataUser,
        orders: getDataOrder,
        categories: getDataCategory,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

module.exports = { getDashboardAdmin };
