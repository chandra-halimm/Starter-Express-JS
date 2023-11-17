const express = require("express");
const router = express.Router();
const { getUsers, Register } = require("../controller/User");

router.get("/users", getUsers);
router.post("/users", Register);

module.exports = router;
