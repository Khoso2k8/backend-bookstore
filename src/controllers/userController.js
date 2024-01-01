const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      err: err.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    res.status(201).json({
      status: "success",
      data: {
        users: newUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      err: err.message,
    });
  }
};

exports.getUser = (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      status: "success",
      isAuthenticated: true,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      err: err.message,
    });
  }
};
