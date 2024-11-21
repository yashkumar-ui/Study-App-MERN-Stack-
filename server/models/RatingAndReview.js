// require the mongoose
const mongoose = require("mongoose");

// create the model 
const RatingAndReviewSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    rating:{
        type:Number,
        requied:true,
    },
    review:{
        type:String,
        requied:true,
    },
    course : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course",
        required: true,
        index:true,
    },
});

// export the model 
module.exports = mongoose.model("RatingAndReview" , RatingAndReviewSchema);