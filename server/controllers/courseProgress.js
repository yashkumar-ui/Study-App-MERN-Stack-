// used to track the course progeress of the user data
const mongoose = require("mongoose")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress") 



//upadate the course progress 
exports.updateCourseProgress = async (req , res) => {
    try{

        // fetch the course and subsection id from the body 
        const {courseId , subSectionId} = req.body
        const userId = req.user.id

        // find the subsection 
        const subsection = await SubSection.findById(subSectionId);

        if(!subsection){
            return  res.status(400).json({
                success:false,
                message:"Sub section is not found"
            })
        }

        // find the course progress doucment 
        let courseProgress = await CourseProgress.findOne({
            courseId : courseId,
            userId:userId,
        })

        if(!courseProgress){
            return res.status(403).json({
                success:false,
                message:"Course progress doesnot exists",
            })
        }else{
            // check if it is already completed or not 
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(405).json({
                    success:false,
                    message:"Lecture is Already Completed ",
                })
            }
            // add the subsection id 
            courseProgress.completedVideos.push(subSectionId)
        }

        await courseProgress.save();

        // return the success response 
        return res.status(200).json({
            success:true,
            message:"Course Progress updated ",
        })


    } catch(error){
        console.log("update course error", error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })
    }
}