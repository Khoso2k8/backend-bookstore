const express = require("express");
const orderController = require("../controllers/orderController");
const router = express.Router();

router.route("/orders").post(orderController.createOrder);

module.exports = router;
