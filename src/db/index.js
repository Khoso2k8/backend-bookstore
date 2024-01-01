const mongoose = require("mongoose");
const { DB_NAME } = require("../constants");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DATABASE__URL}/${DB_NAME}`
    );
    console.log(
      `Successfully connected to DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log(`MonogoDB Error: ${err}`);
    process.exit(1);
  }
};

module.exports = connectDB;
