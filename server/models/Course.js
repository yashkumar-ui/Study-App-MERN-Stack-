// require the mongoose 
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName : {
        type:String,
        required:true,
    },
    courseDescription:{
        type:String,
        required:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    whatYouWillLearn:{
        type:String, 
    },
    courseContent : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",
        }
    ],
    ratingAndReviews: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview",
        }
    ],
    price:{
        type:Number,
        requied:true,
        trim:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    tag:{
        type: [String],
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    instructions : {
        type: [String],
    },
    status: {
        type : String , 
        enum : ["Draft" , "Published"],
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})


// export the model 
module.exports = mongoose.model("Course", courseSchema);