// require the mongoose 
const mongoose = require("mongoose");

// create the model 
const SubSectionSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    timeDuration:{
        type:String,
    },
    description:{
        type:String,
    },
    videoUrl:{
        type:String,
    }
})

// export the model

module.exports = mongoose.model("SubSection" , SubSectionSchema);