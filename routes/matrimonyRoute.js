const express = require("express");
const router = express.Router();

const matrimonyController = require("../controller/matrimonyController");

router.get("/",matrimonyController );
router.get("/:id",matrimonyController);
router.post("/", matrimonyController);
router.delete("/:id",matrimonyController);

module.exports = router;
