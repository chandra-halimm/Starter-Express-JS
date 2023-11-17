const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({
      data: users,
      message: "success get all data",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword) {
    return res.status(400).json({
      message: "password doesn't match",
    });
  }

  const existingUser = await User.findOne({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return res.status(400).json({
      message: "email has been registered",
    });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    return res.status(201).json({
      data: newUser,
      message: "success register data",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const Login = async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { getUsers, Register, Login };
