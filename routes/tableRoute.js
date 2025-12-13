const express = require("express")
const { tables, addTable, getTable, deleteTable, updateTable, tableByStatus } = require("../controllers/tableController")
const verifyUserMiddleware = require("../middlewares/tokenVerifier")
const router = express.Router();

router.route("/all").get(verifyUserMiddleware, tables)
router.route("/get/:id").get(verifyUserMiddleware, getTable)
router.route("/add").post(verifyUserMiddleware, addTable)
router.route("/status").get(verifyUserMiddleware, tableByStatus);
router.route("/update/:id").put(verifyUserMiddleware, updateTable)
router.route("/delete/:id").delete(verifyUserMiddleware, deleteTable)

module.exports = router;