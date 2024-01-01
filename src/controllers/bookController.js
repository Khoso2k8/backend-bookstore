const Book = require("../models/bookModel");
const Author = require("../models/authorModel");
const Category = require("../models/categoryModel");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      status: "success",
      numBooks: books.length,
      data: {
        books,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create({
      titleEnglish: req.body.titleEnglish,
      titleSindhi: req.body.titleSindhi,
      titleUrdu: req.body.titleUrdu,
      authors: req.body.authors,
      imageCover: req.body.imageCover,
      price: req.body.price,
    });

    res.status(201).json({
      status: "success",
      data: {
        newBook,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      err: err.message,
    });
  }
};
