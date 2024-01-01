const { promisify } = require("util");
const crypto = require("crypto");

const jwt = require("jsonwebtoken");

const sendEmail = require("../utilis/email");
const User = require("../models/userModel");

const signToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 1000
    ),

    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
};

const sendOtpEmail = async (req, user) => {
  const otp = user.createOtp();

  await user.save({ validateBeforeSave: false });

  const emailOptions = {
    from: '"BookStore 👻" <meerkhan2k8@gmail.com>',
    to: req.body.email,
    subject: "Account Verification mail valid for 10 minutes",
    template: "email",
    context: {
      name: req.body.firstName,
      otp,
    },
  };

  sendEmail(emailOptions).catch(console.error);
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const user = await User.findOne({ email: req.body.email });

    //Generate Random OTP for verification and send it to verification
    sendOtpEmail(req, user);

    res.status(201).json({
      status: "success",
      message:
        "Verification otp sent to your email account please verify otp to activate your account and login to your account",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      err: err.message,
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const otp = req.body.otp;
    console.log("request received here is your token:", otp);
    if (!otp) {
      throw new Error("verification otp not received");
    }
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    const user = await User.findOne({
      otp: hashedOtp,
      otpExpires: { $gt: Date.now() },
    });
    if (!user) {
      throw new Error("OTP is invalid or OTP has expired");
    }

    //change the isVerified property to true
    user.isVerified = true;
    await user.save({ validateBeforeSave: false });

    //send the json token token sign in the user and response
    signToken(user._id, res);
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  //check the request contain user email and password and password
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please insert email and passowrd to login");
    }

    //check the user exist with email received in request and password matches with DB stored password

    const userPassword = await User.findOne({ email }).select("password");
    const user = await User.findOne({ email });

    if (
      !user ||
      !(await user.correctPassword(password, userPassword.password))
    ) {
      throw new Error("Invalid ID or wrong password");
    }

    if (!user.isVerified) {
      sendOtpEmail(req, user);
      throw new Error(
        "Your email is not verified. OTP sent to your email address verify your email to login "
      );
    }

    //if all ok then send jwt token
    const jwtToken = signToken(user._id, res);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      err: err.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  //receive and check token exist in request
  try {
    let token;
    if (req.headers.cookie) {
      token = req.headers.cookie.split("=").at(-1);
    }

    if (!token) {
      throw new Error("Your are not loged in");
    }

    //if token exist verify the token

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_KEY
    );

    //get the user based on token payload id
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      throw new Error(
        "The token is invalid or user belonging to this token does not exist"
      );
    }

    req.user = currentUser;

    //Give access to the next route
    next();
  } catch (err) {
    res.status(401).json({
      status: "fail",
      err: err.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    req.user = null;
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      err: err.message,
    });
  }
};
