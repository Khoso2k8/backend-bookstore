const mongoose = require("mongoose");

const orderItemsSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: [true, "please order at least one book in an order"],
  },
  quantity: {
    type: Number,
    required: [true, "please mention the quantity of the book ordered"],
  },
});

const OrderItems = mongoose.model("OrderItems", orderItemsSchema);

module.exports = OrderItems;
