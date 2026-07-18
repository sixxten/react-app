const { Router } = require("express");
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const upload = require("../middlewares/upload");

const router = Router();

router.get("/", productController.getAll);
router.get("/:id", productController.getById);

router.post("/", authMiddleware, adminMiddleware, productController.create);
router.patch("/:id", authMiddleware, adminMiddleware, productController.update);
router.delete("/:id", authMiddleware, adminMiddleware, productController.remove);
router.post(
  "/:id/image",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  productController.uploadImage
);

module.exports = router;