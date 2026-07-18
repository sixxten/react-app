const { Router } = require("express");
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = Router();

router.get("/", productController.getAll);
router.get("/:id", productController.getById);

router.post("/", authMiddleware, adminMiddleware, productController.create);
router.patch("/:id", authMiddleware, adminMiddleware, productController.update);
router.delete("/:id", authMiddleware, adminMiddleware, productController.remove);

module.exports = router;