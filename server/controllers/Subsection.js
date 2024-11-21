// lets create the subsection of the course
const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utilis/imageUploader");
require("dotenv").config();

// create subsection controller 
exports.createSubSection = async (req,res) => {
    try{
        // fecth the data from the body ...
        const {sectionId , title , description } = req.body;
        // extract the file , video file 
        const video = req.files.video;
        // validation 
        if(!sectionId || !title  || !description || !video ){
            return res.status(400).json({
                success:false,
                message : "all fields are required ...",
            })
        }
        // we save the video url , upload the video to the cloudinary , and get the secure url 
        const uploadDetails = await uploadImageToCloudinary(video , process.env.FOLDER_NAME);
        // create the subsection
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration: `${uploadDetails.duration}`,
            description:description,
            videoUrl:uploadDetails.secure_url,
        });
        // push the subsection id in the section 
        const updatedSection = await Section.findByIdAndUpdate( { _id : sectionId} ,
            {
                $push:{ subSection : subSectionDetails._id},
            },
            { new : true },
            // log the populate query after adding it 
        ).populate("subSection");
        // return the success response  
        return res.status(200).json({
            success:true,
            message:"subsection created successfully .... ",
            data : updatedSection,
        })
    } catch(err){
        return res.status(500).json({
            success:false,
            message:"failure occur while creating the subsection ",
            error:err.message,
            
        });
    }
};

// update the subsection controller 
exports.updateSubSection = async (req,res) => {
    try{
        // fetch the data from the body 
        const {subSectionId , title ,sectionId , description } = req.body;
        // fetch the video file 
        // const video = req.files.video;
        // validation 

        // push the video to the cloudinary 
        // const uploadedVideo = await uploadImageToCloudinary(video , process.env.FOLDER_NAME);
        // update the data 
        const updatedDetails = await SubSection.findByIdAndUpdate( subSectionId , 
            {
                title:title,
                // timeDuration:timeDuration,;
                description:description,
                // videoUrl:uploadedVideo.secure_url,
            },
            { new : true},
         );

         const updatedSection = await Section.findById(sectionId).populate("subSection").exec();
        // return the response 
        return res.status(200).json({
            success:true,
            message:"SubSection updated successfully",
            data:updatedSection,
        });

    } catch(err){
        return res.status(500).json({
            success:false,
            message:"failure occur while update the section ...",
            error: err.message,
        })
    }
}

/// delete the subsection 
exports.deleteSubSection = async (req, res) => {
    try{
        // fetch the subsection id from the body 
        const { sectionId ,subSectionId } = req.body;
        // delete the subsection 
        await SubSection.findByIdAndDelete(subSectionId);
        // --> delete the subsection id from the section --> update subsection part also 
        await Section.findByIdAndUpdate( sectionId , 
            {
                $pull:{ subSection:subSectionId},
            },
            {new:true},
        );
        // return the resposne successfully.....
        const updatedSection = await Section.findById(sectionId).populate("subSection").exec();

        return res.status(200).json({
            success:true,
            message:"subsection delete successfully",
            data:updatedSection,
        })

    } catch(err){
        return res.status(500).json({
            success:false,
            message:"faliure occur while delete the subsection",
            error: err.message,
        })
    }
}

