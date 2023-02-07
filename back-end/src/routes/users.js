const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const { verify, isAdmin } = require("../../utils/verify");

// admin
router.get("/admin", verify, isAdmin, userController.getListUserAdmin);
router.put("/admin/lock", verify, isAdmin, userController.putLockAccountAdmin);
router.put(
  "/admin/unlock",
  verify,
  isAdmin,
  userController.putUnlockAccountAdmin
);

//user
router.put(
  "/change-password",
  verify,
  userController.putUpdatePasswordUserById
);
// router.post("/getAllCustomer", verify, userController.getAllCustomer);
router.get("/:idUser", userController.getDetailUserByUserId);
router.put("/", verify, userController.putUpdateInfoUserById);
router.put("/avatar", verify, userController.putUpdateAvatarUserById);
router.get("/orders-user/:idUser", verify, userController.getListOrderByUserId);

module.exports = router;
