const { Router } = require("express");
const router = Router();

const authRouter = require("./auth.routes");
const productRouter = require("./product.routes");
const categoryRouter = require("./category.routes");

router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);


module.exports = router;