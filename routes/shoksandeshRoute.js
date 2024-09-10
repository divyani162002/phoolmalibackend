const express = require("express");
const router = express.Router();

const shoksandeshController = require("../controller/shoksandeshController");

router.get("/", shoksandeshController.getshoksandeshDetails);
router.get("/:id", shoksandeshController.getshoksandeshDetail);
router.post("/", shoksandeshController.addshoksandeshDetail);
router.delete("/:id",shoksandeshController.deleteshoksandeshDetail);

module.exports = router;
