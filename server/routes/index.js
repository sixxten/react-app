const { Router } = require("express");
const router = Router();

const authRouter = require("./auth.routes");
const productRouter = require("./product.routes");
const categoryRouter = require("./category.routes");
const basketRouter = require("./basket.routes");

router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/basket", basketRouter);

module.exports = router;