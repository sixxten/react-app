const { Router } = require("express");
const categoryController = require("../controllers/categoryController");

const router = Router();

router.get("/", categoryController.getAll);

module.exports = router;