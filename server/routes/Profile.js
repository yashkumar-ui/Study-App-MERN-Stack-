// import the requried models 
const express = require("express");
const router = express.Router();

// importing the required controllers 
const { updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourses } = require("../controllers/Profile");
const { auth, isStudent } = require("../middlewares/auth");

// -------  Routes ------------

// these are the protected routes , so we will use the auth for the protection of these routes 

// route for update the profile section 
router.put("/updateProfile" , auth ,updateProfile );

// route for delete the user account 
router.delete("/deleteProfile",auth ,deleteAccount );

//  getting all the details of the user 
router.get("/getUserDetails" , auth , getAllUserDetails);

// update the profile picture of the user
router.put("/updateDisplayPicture" , auth , updateDisplayPicture);

// router getting the all enrolled couses of the students
router.get("/getEnrolledCourses" , auth , getEnrolledCourses);


// export it 
module.exports = router;