const { Router } = require("express");
const router = Router();

const authRouter = require("./auth.routes");

router.use("/auth", authRouter);

module.exports = router;