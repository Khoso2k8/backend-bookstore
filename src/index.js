const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const connectDB = require("./db/index.js");
const app = require("./app.js");

connectDB();

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
