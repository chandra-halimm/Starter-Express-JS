const express = require("express");
const router = express.Router();
const { RefreshToken } = require("../controller/RefreshToken");
const { getUsers, Register, Login, Logout } = require("../controller/User");

router.get("/users", getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", RefreshToken);
router.delete("/logout", Logout);

module.exports = router;
