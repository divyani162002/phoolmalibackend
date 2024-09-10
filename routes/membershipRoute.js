const express = require("express")
const router = express.Router()

const membershipController = require("../controller/membershipController")


router.get("/",membershipController.getmembers)
router.post("/",membershipController.addmember)
router.delete("/:id",membershipController.deletemembers)





module.exports = router