const express = require("express")
const router = express.Router()

// Auth routes
router.route("/register").post();
router.route("/login").post();


module.exports = router;