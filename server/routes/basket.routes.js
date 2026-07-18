const { Router } = require("express");
const basketController = require("../controllers/basketController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.get("/", authMiddleware, basketController.getBasket);
router.post("/add", authMiddleware, basketController.add);
router.delete("/remove/:productId", authMiddleware, basketController.remove);
router.delete("/clear", authMiddleware, basketController.clear);

module.exports = router;