const express = require("express")
const { orders, getOrder, addOrder, updateOrder, deleteOrder, orderByStatus } = require("../controllers/orderController")
const verifyUserMiddleware = require("../middlewares/tokenVerifier")
const router = express.Router();

router.route("/all").get(verifyUserMiddleware, orders);
router.route("/add").post(verifyUserMiddleware, addOrder)
router.route("/get/:id").get(verifyUserMiddleware, getOrder);
router.route("/group").get(verifyUserMiddleware, orderByStatus);
router.route("/update/:id").put(verifyUserMiddleware, updateOrder);
router.route("/delete/:id").delete(verifyUserMiddleware, deleteOrder);

module.exports = router;