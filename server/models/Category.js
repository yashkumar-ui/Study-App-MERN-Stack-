// require the moongosse for the schema 
const mongoose = require("mongoose");

// create the schema for the category ...

const categorySchema = new mongoose.Schema({
    name : {
        type:String,
        required: true,
    },
    description : {
        type:String,
    },
    courses: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Course",
        }
    ]

})

module.exports = mongoose.model("Category" , categorySchema);