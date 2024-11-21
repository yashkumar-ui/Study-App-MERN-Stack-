// require the mongoose 
const mongoose = require("mongoose");

// create the schema 
const courseProgressSchema = new mongoose.Schema({
    courseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"Course",
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    completedVideos : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: "SubSection",
        }
    ]
})

// export this model 
module.exports =  mongoose.model("CourseProgress", courseProgressSchema);