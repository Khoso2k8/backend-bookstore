const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/users").get(userController.getAllUsers);
router.route("/users/signup").post(authController.signup);
router.route("/users/verifyEmail").post(authController.verifyEmail);

router.route("/users/login").post(authController.login);
router
  .route("/users/getUser")
  .get(authController.protect, userController.getUser);

router.route("/user/logout").get(authController.protect, authController.logout);

module.exports = router;
