const User = require("../models/users");
const Role = require("../models/roles");
const Profile = require("../models/profile");
const Order = require("../models/orders");
const OrderDetail = require("../models/orderdetail");
const ProductModel = require("../models/products");
const ProfileModel = require("../models/profile");
const Payment = require("../models/payments");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const sendEmail = require("../../utils/sendEmail");

// const saltRounds = 10;

const getListUserAdmin = async (req, res) => {
  try {
    const { name } = req.query;
    const getData = await User.findAll({
      where: {
        userName: {
          [Op.like]: `%${name}%`,
        },
        RoleId: {
          [Op.ne]: 3, // not admin
        },
      },
      include: [Role, Profile],
    });
    res.status(200).json({
      status: "200",
      message: "get list user success",
      data: getData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

const putLockAccountAdmin = async (req, res) => {
  // lock account
  try {
    const { id } = req.body;
    const lockAccount = await User.update(
      {
        isActive: 0,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).json({
      status: "200",
      message: "lock account success",
      data: lockAccount,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

const putUnlockAccountAdmin = async (req, res) => {
  // unlock account
  try {
    const { id } = req.body;
    const unlockAccount = await User.update(
      {
        isActive: 1,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).json({
      status: "200",
      message: "unlock account success",
      data: unlockAccount,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

const isIdUnique = async (id, model) => {
  return await model.count({ where: { id: id } });
};

const getDetailUserByUserId = async (req, res) => {
  try {
    const { idUser } = req.params;
    const checkExistId = await isIdUnique(idUser, User);

    if (checkExistId > 0) {
      const getData = await User.findByPk(idUser, {
        include: Profile,
      });
      res.status(200).json({
        status: "200",
        message: "get detail user by user id success",
        data: getData,
      });
    } else {
      res.status(404).json({
        status: "404",
        message: "data not found",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message || "error server",
      data: null,
    });
  }
};

const putUpdateInfoUserById = async (req, res) => {
  try {
    const { idUser, username, email, fullName, phone, gender } = req.body;
    const checkExistId = await isIdUnique(idUser, User);

    if (checkExistId > 0) {
      const updateUser = await User.update(
        {
          userName: username,
        },
        {
          where: {
            id: idUser,
          },
        }
      );
      const checkExistUserIdProfile = await Profile.count({
        where: { UserId: idUser },
      });
      if (checkExistUserIdProfile === 0) {
        const createProfile = await Profile.create(
          {
            fullName: fullName,
            phone: phone,
            gender: gender,
            UserId: idUser,
          },
          {
            where: {
              UserId: idUser,
            },
          }
        );
      } else {
        const updateProfile = await Profile.update(
          {
            fullName: fullName,
            phone: phone,
            gender: gender,
            UserId: idUser,
          },
          {
            where: {
              UserId: idUser,
            },
          }
        );
      }
      res.status(200).json({
        status: "200",
        message: "update info user success",
        data: {
          user: updateUser,
          profile: null,
        },
      });
    } else {
      res.status(404).json({
        status: "404",
        message: "data not found",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message || "error server",
      data: null,
    });
  }
};

const putUpdateAvatarUserById = async (req, res) => {
  try {
    const { idUser, avatar } = req.body;
    const checkExistId = await isIdUnique(idUser, User);

    if (checkExistId > 0) {
      const checkExistUserIdProfile = await Profile.count({
        where: { UserId: idUser },
      });
      if (checkExistUserIdProfile === 0) {
        const createProfile = await Profile.create(
          {
            avatar: avatar,
            UserId: idUser,
          },
          {
            where: {
              UserId: idUser,
            },
          }
        );
      } else {
        const updateProfile = await Profile.update(
          {
            avatar: avatar,
            UserId: idUser,
          },
          {
            where: {
              UserId: idUser,
            },
          }
        );
      }
      res.status(200).json({
        status: "200",
        message: "change avatar user success",
        data: null,
      });
    } else {
      res.status(404).json({
        status: "404",
        message: "data not found",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message || "error server",
      data: null,
    });
  }
};

const getListOrderByUserId = async (req, res) => {
  try {
    const { idUser } = req.params;

    const getData = await Order.findAll({
      where: {
        UserId: idUser,
      },
      include: [
        {
          model: OrderDetail,
          include: {
            model: ProductModel,
            attributes: ["id", "name", "price", "discount"],
          },
        },
        {
          model: Payment,
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

const putUpdatePasswordUserById = async (req, res) => {
  try {
    const { idUser, oldPassword, newPassword } = req.body;
    const checkExistId = await isIdUnique(idUser, User);

    if (checkExistId > 0) {
      const user = await User.findOne({
        where: {
          id: idUser,
          isActive: 1,
        },
      });
      if (await bcrypt.compare(oldPassword, user.hashPassword)) {
        if (user.isActive) {
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          const user = await User.update(
            {
              hashPassword: hashedPassword,
            },
            {
              where: {
                id: idUser,
              },
            }
          );

          res.status(200).json({
            status: "200",
            message: "Thay đổi mật khẩu thành công",
            data: null,
          });
        } else {
          res.status(401).json({
            status: "401",
            message: "Tài khoản của bạn đã bị khóa",
            data: null,
          });
        }
      }
    } else {
      res.status(404).json({
        status: "404",
        message: "data not found",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message || "error server",
      data: null,
    });
  }
};

module.exports = {
  getListUserAdmin,
  putLockAccountAdmin,
  putUnlockAccountAdmin,
  getDetailUserByUserId,
  putUpdateInfoUserById,
  putUpdateAvatarUserById,
  getListOrderByUserId,
  putUpdatePasswordUserById,
};
