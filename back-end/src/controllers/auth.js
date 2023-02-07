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
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const sendEmail = require("../../utils/sendEmail");

// const saltRounds = 10;

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: email,
        isActive: 1,
      },
    });
    if (user === null) {
      res.status(401).json({
        status: "401",
        message: "Đăng nhập tài khoản thất bại",
        data: null,
      });
    } else {
      if (await bcrypt.compare(password, user.hashPassword)) {
        if (user.isActive) {
          const accessToken = jwt.sign(
            {
              idUser: user.id,
              email: user.email,
            },
            "jwtSecret",
            {
              expiresIn: "24h",
            }
          );
          res.status(200).json({
            status: "200",
            message: "Đăng nhập tài khoản thành công",
            data: {
              idUser: user.id,
              username: user.userName,
              email: user.email,
              role: user.RoleId,
              accessToken: accessToken,
            },
          });
        } else {
          res.status(401).json({
            status: "401",
            message: "Tài khoản của bạn đã bị khóa",
            data: null,
          });
        }
      } else {
        res.status(401).json({
          status: "401",
          message: "Đăng nhập tài khoản thất bại",
          data: null,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const checkEmailExist = await User.findOne({
      where: {
        email: email,
      },
    });
    if (checkEmailExist === null) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        userName: username,
        email: email,
        hashPassword: hashedPassword,
        isActive: 1,
      });
      res.status(200).json({
        status: "200",
        message: "Successful account registration",
        data: null,
      });
    } else {
      res.status(409).json({
        status: "409",
        message: "Email already exists. Please register another email",
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

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: email,
        isActive: 1,
        RoleId: 3,
      },
    });
    if (user === null) {
      res.status(401).json({
        status: "401",
        message: "Account login failed",
        data: null,
      });
    } else {
      if (await bcrypt.compare(password, user.hashPassword)) {
        if (user.isActive) {
          const accessToken = jwt.sign(
            {
              idUser: user.id,
              email: user.email,
            },
            "jwtSecret",
            {
              expiresIn: "24h",
            }
          );
          res.status(200).json({
            status: "200",
            message: "Login successfully",
            data: {
              idUser: user.id,
              username: user.userName,
              email: user.email,
              role: user.RoleId,
              accessToken: accessToken,
            },
          });
        } else {
          res.status(401).json({
            status: "401",
            message: "Your account has been locked",
            data: null,
          });
        }
      } else {
        res.status(401).json({
          status: "401",
          message: "Account login failed",
          data: null,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const isIdUnique = async (id, model) => {
  return await model.count({ where: { id: id } });
};

const forgotPasswordByEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: email,
        isActive: 1,
        RoleId: {
          [Op.not]: 3,
        },
      },
    });
    if (user === null) {
      res.status(401).json({
        status: "401",
        message: "Email chưa tồn tại",
        data: null,
      });
    } else {
      const generatePassword = Math.random().toString(36).slice(-8);
      const html = `
        <p>Hello ${user.userName},</p>

        <p>This is a mail from the Kattis system.</p>
        <p>I'm writing to inform you that an account has been created for</p>
        <p>you. Using the account, you can submit solutions to problems on Kattis</p>
        and have them judged.
        <p>Your account name is: ${user.userName}</p>
        <p>Your password is: ${generatePassword}</p>
        <p>You can change these settings by logging in at
        http://localhost:3000/login. There you can find current judge status
        and documentation (including two tutorials). Also, please log in
        to change your password as soon as possible.</p>

        <p>Hope you Tech store!</p>
      `;
      await sendEmail(email, "change password tech store", "test 2", html);
      const hashedPassword = await bcrypt.hash(generatePassword, 10);
      const updateEmail = await User.update(
        {
          hashPassword: hashedPassword,
        },
        {
          where: {
            email: email,
          },
        }
      );

      return res.status(200).json({
        status: "200",
        message: "Mật khẩu đã được gửi qua email của bạn",
        data: updateEmail,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const loginWithGoogle = async (req, res) => {
  const { email, username, avatar } = req.body;
  console.log("email, username, avatar: ", email, username, avatar);
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user === null) {
      // not fount then register account with email
      const userC = await User.create({
        userName: username,
        email: email,
        avatar: avatar,
        hashPassword: "",
        isActive: 1,
      });
      const accessToken = jwt.sign(
        {
          idUser: userC.id,
          email: email,
        },
        "jwtSecret",
        {
          expiresIn: "24h",
        }
      );
      res.status(200).json({
        status: "200",
        message: "Login success",
        data: {
          idUser: userC.id,
          username: username,
          email: email,
          role: userC.RoleId,
          accessToken: accessToken,
        },
      });
    } else {
      if (user.isActive) {
        const accessToken = jwt.sign(
          {
            idUser: user.id,
            email: email,
          },
          "jwtSecret",
          {
            expiresIn: "24h",
          }
        );
        res.status(200).json({
          status: "200",
          message: "Login success",
          data: {
            idUser: user.id,
            username: username,
            email: email,
            role: user.RoleId,
            accessToken: accessToken,
          },
        });
      } else {
        res.status(401).json({
          status: "401",
          message: "Tài khoản của bạn đã bị khóa",
          data: null,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const loginWithFacebook = async (req, res) => {
  const { email, username, avatar } = req.body;
  console.log("email, username, avatar: ", email, username, avatar);
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user === null) {
      // not fount then register account with email
      const userC = await User.create({
        userName: username,
        email: email,
        avatar: avatar,
        hashPassword: "",
        isActive: 1,
      });
      const accessToken = jwt.sign(
        {
          idUser: userC.id,
          email: email,
        },
        "jwtSecret",
        {
          expiresIn: "24h",
        }
      );
      res.status(200).json({
        status: "200",
        message: "Login success",
        data: {
          idUser: userC.id,
          username: username,
          email: email,
          role: userC.RoleId,
          accessToken: accessToken,
        },
      });
    } else {
      if (user.isActive) {
        const accessToken = jwt.sign(
          {
            idUser: user.id,
            email: email,
          },
          "jwtSecret",
          {
            expiresIn: "24h",
          }
        );
        res.status(200).json({
          status: "200",
          message: "Login success",
          data: {
            idUser: user.id,
            username: username,
            email: email,
            role: user.RoleId,
            accessToken: accessToken,
          },
        });
      } else {
        res.status(401).json({
          status: "401",
          message: "Tài khoản của bạn đã bị khóa",
          data: null,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  loginAdmin,
  forgotPasswordByEmail,
  loginWithGoogle,
  loginWithFacebook,
};
