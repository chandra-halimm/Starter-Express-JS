const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/VerifyToken");
const { RefreshToken } = require("../controller/RefreshToken");
const { getUsers, Register, Login, Logout } = require("../controller/User");

router.get("/users", verifyToken, getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", RefreshToken);
router.delete("/logout", Logout);

module.exports = router;
