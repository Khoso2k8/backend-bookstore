const crypto = require("crypto");

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your first name"],
    lowercase: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide your last name"],
    lowercase: "true",
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email address"],
    lowercase: true,
    trim: true,
    unique: [true, "Account wih this email already exist"],
    validate: [validator.isEmail, "This is not a valid email address"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: [
      true,
      "please provide a valid phone number where we can contact you",
    ],
    trim: true,
    unique: [true, "account with this number already exist"],
    validate: {
      validator: function (val) {
        return /^((\+92)|(0092)|(92)|(0))3[0-9]{9}/.test(val);
      },
      message: "This is not valid Pakistani Phone Number",
    },
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
  otp: {
    type: String,
  },
  otpExpires: Date,
  password: {
    type: String,
    required: [true, "Please set a password at least 8 characters long"],
    minlength: 8,
    trim: true,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "confirm your password"],
    trim: true,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Password and Password does not match",
    },
  },
});

// Pre Middleware
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
  }
});

userSchema.methods.correctPassword = async function (reqPassword, dbPassword) {
  return (await bcrypt.compare(reqPassword, dbPassword)) || false;
};

userSchema.methods.createOtp = function () {
  const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
  this.otp = crypto.createHash("sha256").update(otp).digest("hex");

  this.otpExpires = Date.now() + 10 * 60 * 1000;

  return otp;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
