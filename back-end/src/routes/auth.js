const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { verify, isAdmin } = require("../../utils/verify");
const passport = require("passport");

// admin
router.post("/admin/login", authController.loginAdmin);

//user
router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);
router.post("/forgot-password", authController.forgotPasswordByEmail);
router.post("/login-with-google", authController.loginWithGoogle);
router.post("/login-with-facebook", authController.loginWithFacebook);
module.exports = router;
