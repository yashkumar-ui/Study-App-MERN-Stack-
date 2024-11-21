// controller for the course
// fetch all the required models 
const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User"); 
const {uploadImageToCloudinary} = require("../utilis/imageUploader");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { convertSecondsToDuration } = require("../utilis/secToDuration");
const CourseProgress = require("../models/CourseProgress");

require("dotenv").config();

// as we see , when the new course is created , the thumbnail also required , means we have to create the 
// image upload also on the cloudinary .....

// create course controller 
exports.createCourse = async (req,res) => {
    try{
        // get the user id from the body 
        // data fetch
        let {courseName , courseDescription , whatYouWillLearn , price , tag : _tag, category , status = "Draft", instructions: _instructions } = req.body;
        const thumbnail  = req.files.thumbnailImage;
        // console.log("course name --< backend " , courseName)
        const tag = JSON.parse(_tag)
        // console.log("instructions --> ", _instructions)
        // console.log("update tage" , tag)
        // console.log("course Name -=", courseName)
        // console.log("what you will learn", whatYouWillLearn)
        // console.log("courseDescriiption ", courseDescription)
        // console.log("price", price)
        // console.log("category", category)
        // console.log("status", status)
        // console.log("thumbnail", thumbnail)
        // file fetch
      
        // conver the tag and the instuctions from the stringify array to the array
        // const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)
        
        console.log("instructions --> backend" , instructions)

        // validation
        if( !courseName || !courseDescription || !whatYouWillLearn || !price || !category || !instructions.length || !tag.length || !thumbnail ){
            return res.status(403).json({
                success:false,
                message:"all the fields are required ",
            });
        }

        // check the course status type 
        // if( !status || status === undefined ){
        //     status = "Draft"
        // }
        // instuctor validation
        // as we know that the instuctor id will be came from the authorization , fetch that from the token 
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId , {accountType: "Instructor"});
        // console the instuctor details for the people

        // if its not the instructor , then return the response -->
        if(!instructorDetails){
            return res.status(405).json({
                success:false,
                message:"Instrucor details are not found ....",
            });
        }
        // category  vali validation --> performs the categoy validation that , the category is really exist or not, thats why we will performs 
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category details are n't found ...",
            });
        }
        // image upload to cloudinary 
        // lets upload the image to the cloudinary 
         const thumbnailImage = await uploadImageToCloudinary( thumbnail , process.env.FOLDER_NAME);

        // create new course entry in db 
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor : instructorDetails._id,
            whatYouWillLearn : whatYouWillLearn,
            price,
            tag : tag,
            category : categoryDetails._id,
            status:status,
            instructions : instructions,
            thumbnail: thumbnailImage.secure_url,
        })
        // add the new course to the user schema 
        await User.findByIdAndUpdate(
            { _id : instructorDetails._id},
            {
                $push:{
                    courses : newCourse._id,
                }
            },
            {new : true},
        )

        // add course entry in category  ---> ,means we have to add the course id in the category schema 
        await Category.findByIdAndUpdate( 
            { _id : category},
            {
                $push : {
                    courses: newCourse._id,
                }
            },
            { new : true,},
        );

        // return the success response 
        return res.status(200).json({
            success:true,
            message:"Course created successfully ...",
            data : newCourse,
        });

    } catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message : " error while create the course , please try agian later ...",
            error : err.message,
        });
    }
};

// edit course details 
exports.editCourseDetails = async (req,res) => {
    try{
        // edit is comes in way when the course is already created 
        const {courseId} = req.body
        const updates = req.body
        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                success:false,
                message:"course not found"
            })
        }

        /// if the thumbnail also attached , then upload it to the cloud 
        if (req.files){
            const thumbnail = req.flles.thumbnailImage
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            course.thumbnail = thumbnailImage.secure_url
        }
        // updates only the fields that are present in the form data 
        for ( const key in updates) {
            if(updates.hasOwnProperty(key)) {
                if( key === "tag" || key === "instructions"){
                    course[key] = JSON.parse(updates[key])
                }else{
                    course[key] = updates[key]
                }
            }
        }
        // save the course model 
        await course.save();

        // fetch the updated couse with the all fiels populates 
        const updatedCourse = await Course.findOne({
            _id:courseId
        }).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            }
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path:"courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec()

        res.status(200).json({
            success:true,
            message:"Course Updated successfully",
            data:updatedCourse,
        })


    } catch(error){
        console.log("edit course controller error" , error)
        res.status(500).json({
            success:false,
            message:"internal server error",
            error:error.message
        })

    }
}


//get allCourse handler function  
// bascially we will find out the all courses of our website here 

exports.showAllCourses = async (req, res) => {
    try{
        // find all will be implement here , and basically return the resposne ..
        const allCourse = await Course.find({ status : "Published"} , 
            {
                courseName : true , price:true , thumbnail:true, instructor:true , ratingAndReviews:true , studentsEnrolled:true,
            }).populate("instructor").exec();

        // return the response as a success
        return res.status(200).json({
            success:true,
            message:"all the course details fetch successfully..",
            data : allCourse,
        })    

    } catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:" error occure while fetch the all courses details ..",
            error : err.message,
        });
    }
};

// get all coures details 
// need everything , populate all the id's 

exports.getCourseDetails = async (req,res) => {
    try{
        // fetch the data from the body 
        const{ courseId } = req.body;
        // console.log("Course id-->" , courseId);
        // find out the all detials of the course with the populate 
        const courseDetails = await Course.find(
             {_id : courseId}   
        )
        .populate(
            {
                path:"instructor",
                populate:{
                    path:"additionalDetails",
                },
            }
        )
        .populate("category")
        .populate("ratingAndReviews")
        .populate(
            {
                path:"courseContent",
                populate:{
                    path:"subSection",
                    select:"-videoUrl",
                },
            }
        )
        .exec();

        // validation 

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`no course details found with this id -> ${courseId} ..`,
            })
        }
        // console.log("course conten bd" , courseDetails[0].courseContent);
        // find the total duration of the course 
        let totalDurationInSeconds = 0;
        courseDetails[0].courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
              const timeDurationInSeconds = parseInt(subSection.timeDuration)
              totalDurationInSeconds += timeDurationInSeconds
            })
          })
        //   console.log("Total time in seconds =>", totalDurationInSeconds );

          const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        //   console.log("Total time in minutes", totalDuration);
  
        // return the success response
        // console.log(courseDetails);
        return res.status(200).json({
            success:true,
            message:"Course details are found successfully ...",
            data:{
                courseDetails,
                totalDuration,
            }
        })

    } catch(err){
        console.log("problem in fetching the all details of the course ", err);
        return res.status(500).json({
            success:false,
            message:"failure occur while fetch the all details of the course",
            error:err.message,
        })
    }
}

// get the full data of the course
exports.getFullDataOfCourse = async (req, res) => {
    try{
        // fetch the course id from the body 
        const {courseId} = req.body
        const userId = req.user.id

        const courseDetails = await Course.findById(courseId)
           .populate({
               path: "instructor",
               populate : {
                  path : "additionalDetails",
               }
           })
           .populate("category")
           .populate("ratingAndReviews")
           .populate({
               path:"courseContent",
               populate:{
                  path:"subSection",
               }
           })
           .exec();

           let courseProgressCount = await CourseProgress.findOne({
             courseId : courseId,
             userId : userId
           })

           if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"Could get course details",
            })
           }

           // calculate the total duration 
           let totalTimeinSeconds = 0;
           courseDetails.courseContent.forEach( (content) => {
               content.subSection.forEach( (subSection) => {
                  const timeInSeconds = parseInt(subSection.timeDuration);
                  totalTimeinSeconds+= timeInSeconds
               })
           })

           const totalDuration = convertSecondsToDuration(totalTimeinSeconds);

           // return the response 
           return res.status(200).json({
              success:true,
              data : {
                  courseDetails,
                  totalDuration,
                  completedVideos : courseProgressCount?.completedVideos ? courseProgressCount?.completedVideos : [],    
              },
           })

    } catch(error){
        console.log("Full course API data error" , error)
        return res.status(500).json({
            success:false,
            message:"Internal server error for course data"
        })
    }
}

// fetch the particular instructor courses 
exports.getInstructorCourses = async (req, res) => {
    try{
        // fetch the instructor id from the body
        // const instructorId = req.body;

        const userId = req.user.id;
        const instrutorCourses = await Course.find({
            instructor : userId,
        }).sort({createdAt : -1})

        // return the response 
        return res.status(200).json({
            success:true,
            message:"Instructor courses fetch success",
            data:instrutorCourses
        })

    } catch(err){
        res.status(500).json({
            success:false,
            message:"Error while fetch the instrutor courses",
            error:err.message,
        })
        console.log("error while fetch the instrutor courses ", err);
    }
}

// delete the course 
exports.deleteCourse = async (req, res) => {
    try{
        // fetch the course id 
        const coursexy = req.body;
        const courseId = coursexy.courseId
        console.log("Course Id Backend --> ", courseId);
        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                success:false,
                message:"course not found",
            })
        }

        // unroll the students from that courses
        const studentsEnrolled= course.studentsEnrolled;
        // using the loop , we will remove all the students from that course 
        for( const studentID of studentsEnrolled){
            await User.findByIdAndUpdate( studentID , {
                $pull:{ courses : courseId}
            })
        }

        // delete the section and the subsection associated with this also 
        const courseSections = course.courseContent;

        for( const sectionId of courseSections){
            // find out the section
            const section = await Section.findById(sectionId);
            // if the section is present then we will call for the subsection part 
            if(section){
                const subsections = section.subSection;
                // array of the subsection 
                for( const subsectionId of subsections ){
                    //delete that subsection particular 
                    await SubSection.findByIdAndDelete(subsectionId);
                }
            }

            // delete the section also
            await Section.findByIdAndDelete(sectionId)
        }

        // pull the course id from the category page also 
        const categoryId = course.category;

        await Category.findByIdAndUpdate( categoryId , {
            $pull :{courses : courseId}
        } )

        // delete the course 
        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success:true,
            message:"Course delete successfully..",
        })

    

    } catch(error){
        console.log("problem while delete the course ", error);
        return res.status(500).json({
            success:false,
            message:"failure occur while delete the courses ",
            error:error.message,
        })
    }
}