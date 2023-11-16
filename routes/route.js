const express = require("express");
const router = express.Router();
const { getUsers } = require("../controller/User");

router.get("/users", getUsers);

module.exports = router;
