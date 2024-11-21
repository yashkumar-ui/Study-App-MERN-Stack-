const express = require("express");
const router = express.Router();

// import the require controllers 
const { contactUsController } = require("../controllers/ContactUs");


// router for contact us page 
router.post("/contact" , contactUsController )

module.exports = router;