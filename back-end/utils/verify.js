const jwt = require("jsonwebtoken");
const RoleModel = require("../src/models/roles");
const UserModel = require("../src/models/users");

const verify = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, "jwtSecret");

      const foundUser = await UserModel.findOne({
        where: {
          id: decoded.idUser,
          email: decoded.email,
        },
        include: RoleModel,
      });
      // console.log("foundUser: ", foundUser.Role.type);
      // if User exist
      if (foundUser) {
        // console.log("foundUser: ", foundUser.Role.type);
        // forward id property to check role
        req.idUser = foundUser.id;
        req.role = foundUser.Role.type;
        req.email = foundUser.email;
        next();
        return;
      }

      // does not exist
      return res
        .status(403)
        .json({ message: "Forbidden! Requires a token to access" });
    } catch (error) {
      res.status(403).json({
        status: "403",
        message: "Token is not valid",
        data: null,
      });
    }
  } else {
    res.status(401).json({
      status: "401",
      message: "You are not authenticated",
      data: null,
    });
  }
};

const isAdmin = (req, res, next) => {
  const role = req.role;
  if (role.toLowerCase() === "admin") {
    next();
    return;
  }

  return res.status(403).json({
    status: "403",
    message: "Forbidden! Requires a token to access.",
  });
};

const isStaff = (req, res, next) => {
  const role = req.role;
  if (role.toLowerCase() === "staff") {
    next();
    return;
  }

  return res.status(403).json({
    status: "403",
    message: "Forbidden! This action requires Admin role to do.",
  });
};

module.exports = {
  verify,
  isAdmin,
  isStaff,
};
