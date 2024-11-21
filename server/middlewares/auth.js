// require the json web token ans dotenv package 
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//  auth middlware 
exports.auth =  async (req, res , next) => {
    try{
        // fetch the token , 3 ways to fetch the token => body , cookie , bearer 
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer " , "");
        /// if the token is empty , send the response 

        if(!token || token === undefined ){
            return res.status(403).json({
                success:false,
                message:"token is missing"
            })
        }

        // token is found , we will verify the token using the JWT_SECRET key 
        try{
            const decode = jwt.verify(token , process.env.JWT_SECRET); 
            console.log(decode);

            // add this in the req  object , for the further authorization
            req.user = decode; 
        } catch(err){
            res.status(400).json({
                success:false,
                message:"token invalid..",
            });
        }
        next();

    } catch(err){
        return res.status(500).json({
            success:false,
            message:"something went wrong while verify the user ",
        })
    }
};

// is Student 
exports.isStudent = async (req, res , next ) => {
    try{
        // fetch the role of the user from the request 

        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"this protected route is for Students only .."
            });
        }
        next();

    } catch(err){
        return res.status(500).json({
            success:false,
            message:"user role cannot be verified , please try again later ",
        })
    }
}

// is Instructor
exports.isInstructor = async (req, res , next ) => {
    try{
        // fetch the role of the user from the request 

        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"this protected route is for Instructor only .."
            });
        }
        next();

    } catch(err){
        return res.status(500).json({
            success:false,
            message:"user role cannot be verified , please try again later ",
        })
    }
}


// is Admin 

exports.isAdmin = (req, res , next ) => {
    try{
        // fetch the role of the user from the request 

        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"this protected route is for Admin only .."
            });
        }
        next();

    } catch(err){
        return res.status(500).json({
            success:false,
            message:"user role cannot be verified , please try again later ",
        });
    }
}
