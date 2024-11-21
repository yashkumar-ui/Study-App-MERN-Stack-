// controller for the reset password 
const User = require("../models/User");
const mailSender = require("../utilis/mailSender");
const resetPasswordTemplate = require("../mail/templates/resetPassword")
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//  reset password token  
exports.resetPasswordLink  = async (req,res) => {
    try{
        // fetch the email from the body 
        const {email} = req.body;
        // check the validation and user for this email
        const user = await User.findOne({ email : email});

        if (!user){
            return res.status(403).json({
                success:false,
                message:"Your email is not register with us , please signup first ",
            })
        }
        // generate token 
        // token will be generate using the inbuilt crypto library in node modules 
        const token = crypto.randomUUID();
        // update the user by adding the token and the expries time 
        const updatedDetails = await User.findOneAndUpdate({email} , 
            {
            token : token,
            resetPasswordExpires : Date.now() + 5*60*1000,
            },
            {new : true},
        )
        // create url 
        const url = `http://localhost:3000/update-password/${token}`;
        // send mail containig the url 
        await mailSender(email , "Password reset link from StudyNotion" ,
               resetPasswordTemplate(url), 
        )
        // return the response 
        res.status(200).json({
            success:true,
            message:"mail send successfully , please check the mail and change password",
        })


    } catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"something went wrong while sending the mail"
        });
    }
}


//  reset the password
// this is actual used to change the password of the user using the link that is send on the mail 

exports.resetPassword = async (req, res) => {
    try{
        // fetch the password , confirm password  and token from the req body (they sent in the body from the frontend) --->
        const{password , confirmPassword , token } = req.body;
        // validation 
        if( password !== confirmPassword){
            return res.status(403).json({
                success:false,
                message:"password and confirm password are not match",
            });
        }
        // get the userdetails from the database 
        const userDetails = await User.findOne({token : token});
        // if no entry -> invalid token
        if(!userDetails){
            return res.json({
                success:false,
                message:"token is invalid ",
            })
        }
        // check the token time 
        if( !(userDetails.resetPasswordExpires > Date.now() ) ){
            return res.json({
                success:false,
                message:"token is expired , please try again from starting"
            })
        }
        // hash the password 
        const hashedPassword = await bcrypt.hash(password , 10);
        // update the paswword 
        const updatedDetails = await User.findOneAndUpdate({token : token} , {password:hashedPassword} , {new:true});
        // return the response 
        res.status(200).json({
            success:true,
            message:"password updated successfully ..."
        })


    } catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while changing the password ..",
        })
    }
}
