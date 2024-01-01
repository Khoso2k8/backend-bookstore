const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title of the category must be mentioned"],
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
