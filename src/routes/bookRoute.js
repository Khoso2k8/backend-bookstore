const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

router
  .route("/books")
  .get(bookController.getAllBooks)
  .post(bookController.createBook);

router.route("/books/:id").get(bookController.getBook);

module.exports = router;
