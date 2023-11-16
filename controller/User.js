const User = require("../models/UserModel");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({
      data: users,
      message: "success get all data",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { getUsers };
