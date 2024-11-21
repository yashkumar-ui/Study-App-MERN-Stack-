// import the required modules 
const express = require("express");
const router = express.Router();

// import the controllers 

// course controllers --->
const { createCourse, showAllCourses, getCourseDetails, editCourseDetails, getInstructorCourses, deleteCourse, getFullDataOfCourse } = require("../controllers/Course");

// categories controllers --->
const { createCategory, showAllCategory, categoryPageDetails } = require("../controllers/Category");

// sections controllers ---->
const { createSection, updateSection, deleteSection } = require("../controllers/Section");

// subsection controllers ---->
const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/Subsection");

// rating controllers ---->
const { createRating, getAverageRating, getAllRating } = require("../controllers/RatingAndReview");

// import the middlewares ---->
const { auth, isInstructor, isAdmin, isStudent } = require("../middlewares/auth");
const { updateCourseProgress } = require("../controllers/courseProgress");

//-------------------Courses routes ------------------------

// create a new course route ----> new course only created by the instructor , protected route
router.post("/createCourse" , auth , isInstructor , createCourse);
router.post("/editCourse", auth ,isInstructor , editCourseDetails)
// show all courses
router.get("/getAllCourses" , showAllCourses);
// show full course details 
router.post("/getCourseDetails" , getCourseDetails);


//create a new section 
router.post("/addSection" , auth , isInstructor ,createSection );
// update a section
router.post("/updateSection" , auth , isInstructor , updateSection);
// delete a section 
router.post("/deleteSection" , auth , isInstructor , deleteSection);
// create a  new subsection 
router.post("/addSubSection" , auth , isInstructor , createSubSection);
// update a subsection 
router.post("/updateSubSection" , auth , isInstructor , updateSubSection);
// delete a subsection 
router.post("/deleteSubSection" , auth , isInstructor , deleteSubSection);
// get the instructor courses 
router.get("/getInstructorCourses", auth , isInstructor , getInstructorCourses );
// get the full data of course 
router.post("/getFullDataOfCourse" , auth , getFullDataOfCourse)
// update the course Progress section 
router.post("/updateCourseProgress", auth , isStudent , updateCourseProgress)
// delet the course 
router.delete("/deleteCourse", deleteCourse);




//-------------------Category Routes (Admin onlys ) -----------------------
// new  category only be created by the admin 
router.post("/createCategory" , auth , isAdmin , createCategory );
// show all category router 
router.get("/showAllCategories" , showAllCategory );
// category page details router 
router.post("/getCategoryPageDetails" ,categoryPageDetails );




// ------------------Rating and review routes -----------------------------

// create a new rating and review (only created by the students )
router.post("/createRating" , auth , isStudent , createRating);
// get the average rating 
router.get("/getAverageRating", getAverageRating);
// get all the ratings and the reviews 
router.get("/getReviews" , getAllRating);


// exports the routes 
module.exports = router;