// import required models
const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");
const { ObjectId } = mongoose;

// create a new rating and review
exports.createRating = async (req,res) => {
    try{
        // get the user if from the request 
        const userId = req.user.id;
        // fetch the data from the body 
        const {rating , review , courseId } = req.body;
        // perform the validation
        if(!rating || !review ){
            return res.status(400).json({
                success:false,
                message:"all the fields are required ",
            })
        }
        // check if the user is already enrolled or not 
         const courseDetails = await Course.findOne(
            { 
                _id : courseId,
                studentsEnrolled : {$elemMatch: {$eq : userId}},
            }
         );
         if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:` no course found with this course id ${courseId} `,
            })
         }
        // check if the user already reviwed or not 
        const alreadyReviewd = await RatingAndReview.findOne(
            {
                user : userId,
                course : courseId,
            }
        );

        if(alreadyReviewd){
            return res.status(403).json({
                success:false,
                message:"Student already review this course , you cann't review again..",
            });
        };
        // if not , then create the  new rating for that course 
        const ratingAndReview = await RatingAndReview.create({
            rating,
            review,
            course:courseId,
            user:userId,
        });
        
        // update the rating in the course section 
       await Course.findByIdAndUpdate({ _id : courseId} , 
           {
              $push: { ratingAndReviews : ratingAndReview._id }
           },
           { new : true},
       );
        // return the response 
        return res.status(200).json({
            success:true,
            message:"Rating and the review done successfully",
            data : ratingAndReview,
        });

    } catch(err){
        console.log(" failure occur while fetching the rating and the review" , err.message);
        return res.status(500).json({
            success:false,
            message:"failure occur while creating the rating ..",
            error:err.message,
        })
    }
}


// average rating controller
exports.getAverageRating = async (req , res) => {
    try{
        // get the course id 
        const courseId = req.body.courseId;
        // calculate the average rating
        const result = await RatingAndReview.aggregate([
            {
                $match : {
                    course : new ObjectId(courseId),
                },
            },
            {
                $group : {
                    _id : null ,
                    averageRating : { $avg : "$rating" },
                }
            }
        ])
        // return the response 
        if(result.length > 0 ){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        };

        // if no rating is found on that course 

        return res.status(200).json({
            success:true,
            message:"Average rating is 0 , no rating found",
            averageRating:0,
        });

    } catch(err){
        console.log("failure in getting average rating ", err.message);
        return res.status(500).json({
            success:false,
            message:"failure occur while fetching the average rating ..",
            error:err.message,
        });
    }
}


// get all the ratings 
exports.getAllRating = async (req,res) => {
    try{
        // get all the ratings --> on basics of course or all rating on the website
        const allRating = await RatingAndReview.find({})
                                         .sort({rating:"dec"})
                                         .populate({
                                            path:"user",
                                            select:" firstName lastName email Image",
                                         })
                                         .populate({
                                            path:"course",
                                            select:"courseName",
                                         })
                                         .exec();
        // condition of reviews , we want all the reviews on the decreasing order 
        // sort the ratings  
        // return the response 
        return res.status(200).json({
            success:true,
            message:"all the ratings reviews are fetched successfully..",
            data : allRating,
        })

    } catch(err){
        console.log("error while getting all the reviews ", err.message);
        return res.status(500).json({
            success:false,
            message:"failure occur while getting all ratings ",
            error:err.message,
        })
    }
}