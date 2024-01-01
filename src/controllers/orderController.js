const OrderItems = require("../models/orderItemsModel");
const Order = require("../models/orderModel");

exports.createOrder = async (req, res) => {
  try {
    const orderItemsId = [];
    const newOrderItems = await Promise.all(
      req.body.items.map(async (item) => {
        const newItem = await OrderItems.create({
          book: item.cartItem._id,
          quantity: item.quantity,
        });
        return newItem._id;
      })
    );
    const newOrder = await Order.create({
      orderItems: newOrderItems,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      province: req.body.city,
    });
    res.status(201).json({
      status: "success",
      data: {
        order: newOrder,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      err: err.message,
    });
  }
};
