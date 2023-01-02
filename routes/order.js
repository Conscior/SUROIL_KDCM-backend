const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");
const verifyJWT = require("../middleware/verifyJWT");

// router.route('/')
//     .get(ordersController.getOrders)
//     .post(ordersController.createOrder)
//     .patch(ordersController.createOrder)
//     .delete("/:orderId", ordersController.deleteOrder)

router.route("/").get(ordersController.getOrders);
router.route("/").post(ordersController.createOrder);
router.route("/").patch(ordersController.createOrder);
router.route("/:order_id").delete(ordersController.deleteOrder);

router.route("/user/:user_id").get(ordersController.getUserOrders);

module.exports = router;
