// import all the required modules 
const express = require("express");
const router = express.Router();

// import the controllers required 
const { login, signUp, sendOTP, changePassword } = require("../controllers/Auth");
const { resetPasswordLink, resetPassword } = require("../controllers/ResetPassword");

// import the required middleware 
const {auth} = require("../middlewares/auth");

// Routes for the login , signup , auth..

// login route
router.post("/login" , login);

// signup route 
router.post("/signup" , signUp);

// send otp route
router.post("/sendotp" , sendOTP);

// change password route 
router.post("/changepassword" , auth , changePassword);


// -------- Routes for the reset Password------

// reset password link 
router.post("/reset-password-token" , resetPasswordLink);

// reset password 
router.post("/reset-password" , resetPassword);


module.exports = router;