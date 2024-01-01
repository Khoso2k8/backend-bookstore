const mongoose = require("mongoose");
const Author = require("./authorModel");

const bookSchema = new mongoose.Schema({
  titleEnglish: {
    type: String,
    required: [true, "Books title in english is mandatory"],
    lowercase: true,
    trim: true,
  },
  titleSindhi: String,
  titleUrdu: String,
  authors: [String],
  price: {
    type: Number,
    required: [true, "price of each must be mentioned"],
  },
  discountPrice: Number,
  imageCover: {
    type: String,
    required: [true, "Give a photo to be displayed on the cover for book"],
  },
  images: [String],
});

// POST Document Middleware

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
