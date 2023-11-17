const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { response } = require("express");
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
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Incorrect email",
      });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }

    const userId = user.userID;
    const name = user.name;
    const email = user.email;
    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await User.update(
      { refresh_token: refreshToken },
      {
        where: {
          userID: userId,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httponly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.sendStatus(204);
  }

  try {
    const user = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user) {
      return res.sendStatus(204);
    }

    const userId = user.userID;
    await User.update(
      { refresh_token: null },
      {
        where: {
          userID: userId,
        },
      }
    );

    res.clearCookie("refreshToken");
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { getUsers, Register, Login, Logout };
