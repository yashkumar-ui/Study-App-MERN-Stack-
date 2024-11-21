// require the moongose 
const mongoose = require("mongoose");

// import the config from the env file 
require("dotenv").config();

// function to connect with the database 
const dbConnect =  () => {
    // connect the db 
    mongoose.connect( process.env.DATABASE_URL , {
        //  useNewUrlParser : true,
        //  useUnifiedTopology : true,
    })
    .then( () => console.log("DB connect successfully..."))
    .catch( (err) => {
        console.log("error while DB connection ");
        console.log(err);
        process.exit(1);
    })
};

// export the function 
module.exports = dbConnect;