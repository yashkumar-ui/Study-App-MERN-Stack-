// moongose required 
const mongoose = require("mongoose");

// define the schema 
const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required:true,
        trim:true,
    },
    lastName : {
        type: String , 
        required: true,
        trim:true,
    },
    email : {
        type:String,
        required:true,
        trim:true,
    },
    password : {
        type:String,
        required:true,
    },
    accountType : {
        type:String,
        enum : ["Admin" , "Student" , "Instructor"],
        required : true,
    },
    active : {
        type:Boolean,
        default:true,
    },
    approved : {
        type:Boolean,
        default:true,
    },
    additionalDetails : {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile",
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    }],
    image:{
        type:String,
        required:true,
    },
    token : {
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
    courseProgress : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress",
        }
    ]
},
 // add the time laps when the document is created or the updated 
 { timestamps:true},
)


// export the model 

module.exports = mongoose.model("User" , userSchema);