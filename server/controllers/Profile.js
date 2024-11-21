// import the require models 
const Profile = require("../models/Profile");
const User = require("../models/User"); 
const Course = require("../models/Course");
const {uploadImageToCloudinary} = require("../utilis/imageUploader");
const { convertSecondsToDuration } = require("../utilis/secToDuration");
const CourseProgress = require("../models/CourseProgress");
require("dotenv").config();


// update the profile secton ---> 
exports.updateProfile = async (req,res) => {
    try{
        // fetch the data .
        const { firstName="", lastName="" ,dateOfBirth="" , about="" , contactNumber , gender } = req.body;
        // get the user id 
        const id = req.user.id; // we already add this in the payload of the jwt when the user login 
        // performs the validation 
        // if( !contactNumber || !gender  || !id ){
        //     return res.status(400).json({
        //         success:false,
        //         message:"all fields are required ",
        //     });
        // }
        // find the profile and update it 
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;

        const profileDetails = await Profile.findById(profileId);

        // update the user name in the user model 
        const user  = await User.findByIdAndUpdate({ _id:id} , {
            firstName:firstName,
            lastName:lastName,
          },
          {new:true}
        )

        // update the profile data 
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.gender = gender;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        // save the data 
        await profileDetails.save();

        // find the updated user details 
        const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec()

        // return the response
        return res.status(200).json({
            success:true,
            message:"profile updated successfully..",
            updatedUserDetails
        });

    } catch(err){
        return res.status(500).json({
            success:true,
            message:"failure occur while update the profile ...",
            error : err.message,
        })
    }
};


// delete the account 

exports.deleteAccount = async (req,res) => {
    try{
        // fetch the id 
        const id = req.user.id;
        // check validation 
        const userDetails = await User.findById(id);

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"user not found ",
            })
        }
        // delete the account from the profile model
        await Profile.findByIdAndDelete({ _id : userDetails.additionalDetails});
        
        // if the student is enrolled in any course , delete that student from the enrolled course also ..

        
        // we donot want to delete the user immediately , how we can schedule the user delete time like 3days , 5days 
        // delete the id from the user model
        await User.findByIdAndDelete( {_id: id});

        // return the response 
        return res.status(200).json({
            success:true,
            message:"User  deleted successfully..."
        })

    } catch(err){
        return res.status(500).json({
            success:false,
            message:"failure occur while delete the account ...",
            error: err.message,
        });
    }
};

// get the all  detials  of the user 
exports.getAllUserDetails = async (req, res ) => {
    try{
        // get the id 
        const id = req.user.id;
        // validate the user details 
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        // return the response 
        return res.status(200).json({
            success:true,
            message:"All details of user fetch successfully ..",
            userDetails,
        })

    } catch(err){
        return res.status(500).json({
            success:false,
            message:"failure occur while fetch the all details of the user ",
            error: err.message,
        });
    }
};

// update profile picture controller -->

exports.updateDisplayPicture = async (req , res) => {
    try{
        // get the image , user id from the req -> files 
        const displayPicture = req.files.displayPicture
        const userId = req.user.id;
        // perform the validation 
        if(!displayPicture){
            return res.status(400).json({
                success:false,
                message:"image file is required",
            })
        };
        // upload image to the cloudinary  and get the link 
        const uploadImage = await uploadImageToCloudinary( displayPicture , process.env.FOLDER_NAME , 1000 , 1000 )

        // console.log(uploadImage);
        // update the profile section 
        const updatedUser = await User.findByIdAndUpdate(
            {_id : userId},
            {
                image : uploadImage.secure_url
            },
            { new : true}
        ).populate("additionalDetails")
        // return the success response 

        return res.status(200).json({
            success:true,
            message:"Profile picture updated successfully..",
            data : updatedUser
        })

    } catch(err){
        console.log("error occur while update the profile picture " , err.message);
        return res.status(500).json({
            success:false,
            message:"error while update the profile picture",
            error:err.message,
        })
    }
}

// get all the enrolled courses of the student 
exports.getEnrolledCourses = async (req , res) => {
    try{
        // get the userId 
        const userId = req.user.id;
        // fetch the user Data 
        let userDetails = await User.findOne({_id: userId})
        .populate({
            path : "courses",
            populate:{
                path: "courseContent",
                populate : {
                    path : "subSection",
                },
            },
        })
        .exec();

        // if(!userDetails){
        //     return res.status(400).json({
        //         success:false,
        //         message:`could not found any user with this id ${userId}`
        //     })
        // }
        // // get the enrolled courses from that 
        // const enrolledCourses = userDetails.courses;
        // return the response 

        // conver the mogodata into the object 
        userDetails = userDetails.toObject();
        var SubsectionLength = 0

        for( var i = 0 ; i< userDetails.courses.length ; i++){
            let totalDurationInSeconds = 0;
            SubsectionLength = 0;
            for( var j = 0; j < userDetails.courses[i].courseContent.length ; j++ ) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce( (acc , curr) => acc + parseInt(curr.timeDuration) , 0)

                userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);
                
                SubsectionLength += userDetails.courses[i].courseContent[j].subSection.length
            }

            let courseProgressCount = await CourseProgress.findOne({
                courseId : userDetails.courses[i]._id,
                userId : userId,
            })

            courseProgressCount = courseProgressCount?.completedVideos.length
            if(SubsectionLength === 0){
                userDetails.courses[i].progressPercentage = 100
            }else{
                        // To make it up to 2 decimal point
                 const multiplier = Math.pow(10, 2)
                 userDetails.courses[i].progressPercentage =
                       Math.round(
                       (courseProgressCount / SubsectionLength) * 100 * multiplier
                        ) / multiplier
            }
        }

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"Could not find user "
            })
        }

        return res.status(200).json({
            success:true,
            message:`these are the enrolled coursed of this user id ${userId}`,
            data : userDetails.courses
        });

    } catch(err){
        console.log("error while getting the enrolled courses", err.message);
        return res.status(500).json({
            success:false,
            message:"faliure occur while getting enrolled courses details",
            error:err.message,
        });
    }
}

