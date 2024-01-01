const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItems",
      required: [true, "Include items to be ordered"],
    },
  ],
  firstName: {
    type: String,
    required: [true, "Please input your first name"],
    trim: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: [true, "please input your last name"],
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "please insert your email address"],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, "please insert your number for contact"],
    trim: true,
    lowercase: true,
  },
  address: {
    type: String,
    required: [
      true,
      "Please insert your address where your order will be delivered",
    ],
    trim: true,
    lowercase: true,
  },
  province: {
    type: String,
    required: [true, "please insert your province name"],
    trim: true,
    lowercase: true,
  },
  city: {
    type: String,
    required: [true, "Please insert your city name"],
    trim: true,
    lowercase: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
