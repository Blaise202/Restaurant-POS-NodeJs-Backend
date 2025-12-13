const express = require("express")
const { orders, getOrder, addOrder, updateOrder, deleteOrder } = require("../controllers/orderController")
const verifyUserMiddleware = require("../middlewares/tokenVerifier")
const router = express.Router();

router.route("/orders").get(verifyUserMiddleware, orders);
router.route("/add").post(verifyUserMiddleware, addOrder)
router.route("/get/:id").get(verifyUserMiddleware, getOrder);
router.route("/update/:id").patch(verifyUserMiddleware, updateOrder);
router.route("/delete/:id").delete(verifyUserMiddleware, deleteOrder);

module.exports = router;