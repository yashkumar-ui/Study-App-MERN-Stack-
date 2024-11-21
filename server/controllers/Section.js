// controller for creating the sections of the course , in each section , there will be the course content present...
// import the requires models 
const Section = require("../models/Section");
const Course = require("../models/Course");
const Subsection = require("../models/SubSection")

// create a section controller 
exports.createSection = async (req,res) => {
    try{
        //data fetch 
        const {sectionName , courseId } = req.body;
        // data validation 
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"all fields are required",
            })
        }
        // create the section
        const newSection = await Section.create({sectionName});
        // push the section id in the course schema --> update the course schema .
        const updatedCourse = await Course.findByIdAndUpdate( courseId , 
            {
                $push : {
                    courseContent: newSection._id,
                }
            },
            {new : true},
        )
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        })
        .exec()

        // return the response ..
        return res.status(200).json({
            success:true,
            message:"Section created successfully...",
            updatedCourse,
        })


    } catch(err){
        return res.status(500).json({
            success:false,
            message:"failure occur while creating the section , please try again later ..",
            error : err.message,
        })
    }
}

// update the section ------>
exports.updateSection = async (req,res) => {
    try{
        // fetch the data 
        const {sectionName , sectionId , courseId} = req.body;
        // data validation
        if( !sectionName || !sectionId ){
            return res.status(400).json({
                success:false,
                message:"Missing properties , all fields are required..",
            });
        }
        // update the data 
        const updatedSection = await Section.findByIdAndUpdate( sectionId , 
            {sectionName} , {new: true}
        );

        // find the updated course 
        const course = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate:{
                    path:"subSection"
                }
            })
            .exec();
        // return response 
        return res.status(200).json({
            success:true,
            message:"section updated successfully..",
            data: course
        });

    } catch(err){
        return res.status(500).json({
            success:false,
            message:"failure occurs while update the section , please try again later..",
            error : err.message,
        });
    }
}


// delete the section --->
exports.deleteSection = async (req,res) => {
    try{
        // fetch the id from the body 
        const { courseId ,sectionId} = req.body;
        const section = await Section.findById(sectionId);
        // delete the section 
        // update this in course schema also  , means delete the section id there also ..
        await Course.findByIdAndUpdate( courseId ,
            {
                $pull: { courseContent : sectionId}
            },
            {new:true},
         );

         // delete the subsection also , that are associated with this id 
         await Subsection.deleteMany({_id: { $in : section.subSection }})
         // delete the section 

         await Section.findByIdAndDelete(sectionId);

         // find the updated course
         const updatedCourse = await Course.findById(courseId)
           .populate({
               path : "courseContent",
               populate:{
                  path:"subSection"
               }
           })
           .exec()
        // return the response successfull ... 
        return res.status(200).json({
            success:true,
            message:"section deleted successfully..",
            data:updatedCourse

        })

    } catch(err){
        return res.status(500).json({
            success:false,
            message:"failure occurs while delete the section , please try again later..",
            error : err.message,
        });
    }
}


