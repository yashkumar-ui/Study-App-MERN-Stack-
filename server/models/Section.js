// require the mongoose 
const mongoose = require("mongoose");

// create the model 

const SectionSchema = new mongoose.Schema({
    sectionName : {
        type:String,
    },
    subSection:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"SubSection",
    }],

});

// export the model

module.exports = mongoose.model("Section", SectionSchema);