const mongose = require("mongoose");

const authorSchema = new mongose.Schema({
  name: {
    type: String,
    required: [true, "name of the author must be mentioned"],
    lowercase: true,
    trim: true,
    unique: [true, "Author already exist"],
  },
  books: [
    {
      type: mongose.Schema.Types.ObjectId,
      required: [true, "please mention name of the writer book"],
    },
  ],
});

const Author = mongose.model("Author", authorSchema);

module.exports = Author;
