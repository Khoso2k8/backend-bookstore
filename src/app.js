const express = require("express");
const cors = require("cors");
const bookRouter = require("./routes/bookRoute");
const userRouter = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const app = express();
app.use(helmet());
app.use(cookieParser());

// Middlewares

app.use(express.json());
const corsOptions = {
  credentials: true,
  origin: ["https://[production-domain.com]", "http://localhost:5173"],
};

app.use(cors(corsOptions));

app.use("/api/v1", bookRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);

module.exports = app;
