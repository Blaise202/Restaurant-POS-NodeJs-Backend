const express = require("express");
const { register, login, users, getUserData } = require("../controllers/userController");
const router = express.Router()
const verifyUserMiddleware = require("../middlewares/tokenVerifier")

router.route("/all").get(users)
// Auth routes
router.route("/register").post(register);
router.route("/login").post(login);

// Logged-in user
router.route("/getUser").get(verifyUserMiddleware, getUserData)

module.exports = router;