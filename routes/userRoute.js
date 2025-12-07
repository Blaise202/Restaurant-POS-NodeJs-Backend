const express = require("express");
const { register, login, users } = require("../controllers/userController");
const router = express.Router()

router.route("/all").get(users)
// Auth routes
router.route("/register").post(register);
router.route("/login").post(login);


module.exports = router;