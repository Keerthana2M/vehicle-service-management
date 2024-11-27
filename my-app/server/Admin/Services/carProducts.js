const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check_auth");
const ProductController = require("../controllers/ProductController");

router.post(
  "/addProduct",
  [checkAuth.verifyToken, checkAuth.isAdmin],
  ProductController.addProduct
);

router.get("/findAll", ProductController.findAll);

router.get("/findById/:productId", ProductController.findByProductId);
router.patch(
  "/updateProduct/:productId",
  [checkAuth.verifyToken, checkAuth.isAdmin],
  ProductController.updateProduct
);

router.delete(
  "/deleteProduct/:productId",
  [checkAuth.verifyToken, checkAuth.isAdmin],
  ProductController.deleteProduct
);
module.exports = router;
