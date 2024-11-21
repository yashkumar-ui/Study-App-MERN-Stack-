// import the requires modules 
const express = require("express");
const router = express.Router();

// import the required controllers 
const { capturePayment , verifyPayment , sendPaymentSuccessEmail } = require("../controllers/Payments");
const { auth, isStudent } = require("../middlewares/auth");

// import the middleware 

/// ------Payments routes 

// capture the payment 
router.post("/capturePayment",auth , isStudent , capturePayment );
router.post("/sendPaymentSuccessEmail" , auth ,isStudent , sendPaymentSuccessEmail )

// verify the signature
router.post("/verifyPayment" ,auth , isStudent , verifyPayment);

// export it 
module.exports = router;