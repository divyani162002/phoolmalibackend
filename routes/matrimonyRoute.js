const express = require("express");
const router = express.Router();

const matrimonyController = require("../controller/metrimonyController");

router.get("/",matrimonyController.getmatrimonyDetails );
router.get("/:id",matrimonyController.getmatrimonyDetail);
router.post("/", matrimonyController.addmatrimonyDetails);
router.delete("/:id",matrimonyController.deletematrimonyDetail);

module.exports = router;
