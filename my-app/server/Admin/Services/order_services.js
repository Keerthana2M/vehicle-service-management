const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check_auth");
const OrderController = require("../controllers/OrderControllers");

router.get(
  "/findPlacedOrder",
  [checkAuth.verifyToken, checkAuth.isAdmin],
  OrderController.findPlacedOrders
);

router.patch(
  "/updateOrder/:orderId",
  [checkAuth.verifyToken, checkAuth.isAdmin],
  OrderController.updateOrder
);

module.exports = router;
