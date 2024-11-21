// authentication will be implemented her 
const User = require("../models/User");
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const {passwordUpdated} = require("../mail/templates/passwordUpdate");
const mailSender = require("../utilis/mailSender");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//send the otp 
exports.sendOTP = async (req,res) => {
    try{
           //fetch the data from the body 
            const {email}  = req.body;

           // check if the user is alreaddy present or not in the database
            const checkUserPresent = await User.findOne({email});

           // if the user is already exists then return the responmse 
            if(checkUserPresent){
                res.status(401).json({
                   success:false,
                   message:"user already exists",
                })
            }
           // user doesn't exists then , generate the otp
           var otp = otpGenerator.generate(6, {upperCaseAlphabets:false , specialChars:false , lowerCaseAlphabets:false } );
           console.log("otp generated -> ", otp);

           // make sure the otp will be unique
           let result = await OTP.findOne({otp : otp});

           while(result){
                var otp = otpGenerator.generate(6, {upperCaseAlphabets:false , specialChars:false , lowerCaseAlphabets:false } );
                result = await OTP.findOne({otp : otp});
           }

           // create the otp object 
           // otp object have email , otp , created at which time will be presented 

           const otpPayload = {email, otp};

           // create the entry in the database 
           const otpBody = await OTP.create(otpPayload);
           console.log(otpBody);

           // return the response successfull

           res.status(200).json({
               success:true,
               message:"otp generated successfully ",
               otp,
           })


    }  catch(err){
           console.log(err);
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }

}

//signup
exports.signUp = async (req ,res) => {
    try{
        // fetch the data from the body // lets do it 
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp

        } = req.body;

        // validate the data 
        if( !firstName || !lastName || !email || !password || !confirmPassword || !otp ){
            return res.status(403).json({
                success:false,
                message:"All fields are required ",
            })
        }

        // 2 passwords match doesn't match , then send the res 
        if( password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password doesn't match , please try again ",
            });
        }

        // check the user exists or not 

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exist , please login it ",
            });
        };

        // find most recent OTP stored for the user 
        // this query basically fetch the most recent otp on that corresponding email 
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);
        // validate the OTP  ----> 
        if( recentOtp.length == 0){
            return res.status(400).json({
                success : false ,
                message:"Otp expires , please try again  "
            })
        }else if (otp !== recentOtp[0].otp){
            // invalid otp 
            return res.status(400).json({
                success:false,
                message:"this is an invaild otp ",
            });
        }

        // hash the password 
        const hashedPassword = await bcrypt.hash(password , 10);

        // entry create in the db 
        // after that the user can add that detials later 

        // aprrove the user , as a instructor or thr students 
        let approved = "";
        approved === "Instructor" ? (approved = fasle ) : (approved = true);

        // create the additional infromation as null for the user .. 
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        })

        const user =  await User.create({
            firstName,
            lastName,
            email,
            password : hashedPassword,
            accountType,
            additionalDetails : profileDetails._id , 
            image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`, 
        })
        // send the success response 

        res.status(200).json({
            success:true,
            message:"user registerd successfully",
            user,
        })


    } catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message: "signup failure , please signup later ",
            error:err.message,
        })
    }
}


//login
// lets create the login page for the user 

exports.login = async (req,res) => {
    try{
        // fetch the data from the body ..
        const {email , password } = req.body;

        //apply the validation 
        if( !email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required ",
            });
        }
        // check if the user already exist in the database or not
        const user = await User.findOne({email}).populate("additionalDetails");
        // if the user doesn't exist send the response 
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user doesn't exist , please signup first",
            })
        }
        // if exist , verify the password and create the jsonwebtoken 
        if( await bcrypt.compare(password,user.password) ){
            // create the jsonw web token and insert it in the user 
            const payload = {
                email : user.email,
                id : user._id,
                accountType : user.accountType,
            }

            // create the token 
            const token = jwt.sign(payload , process.env.JWT_SECRET , {
                    expiresIn:"24h",
            });
            // add the token in the user object 
            user.token = token;
            user.password = undefined;

            // create the cookie 
            const options = {
                expiresIn : new Date( Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            // send the success response 
            res.cookie("token" , token , options).status(200).json({
                success:true,
                message:"user login successfully ..",
                user,
                token,
            })
            

        }else{
            return res.status(400).json({
                success:false,
                message:"password doesn't match , please enter the correct password "
            })
        }
 

    } catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Login failure , please login in later  ",
            error: err.message,
        });
    }
}


// change the password ---->used to change the password in the future <------
exports.changePassword = async (req,res) => {
    try{
        // fetch the data from the body 
        const {oldPassword , newPassword , confirmPassword } =req.body;
        // get the user details 
        const userDetails = await User.findById(req.user.id);
        // apply the validation  
        if(!oldPassword || !newPassword || !confirmPassword){
            return res.status(400).json({
                success:false,
                message:"all the fields are required ...",
            });
        };
        // data will be -> old password , new password , confirm password 
        const isPasswordMatch = await bcrypt.compare( oldPassword , userDetails.password);

        if(!isPasswordMatch){
            return res.status(401).json({
                success:false,
                message:"password doesn't match , please right correct password.",
            });
        };
        // check that the old password is correct or not 
        if( newPassword !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"the password and the confirm password doesn't match...",
            })
        }
 
        // update the password in the database 
        const encryptedPassword = await bcrypt.hash(newPassword , 10);
        const updatedUserDetails = await User.findByIdAndUpdate( req.user.id , 
            {
                password : encryptedPassword,
            },
            { new : true},
        );
        // send the mail that tells about the password has been changed successfully ...
        // send the notification mail 
        try{
            // fetch the email from the user , 
            const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);

            // log the email
            console.log("email has been sent successfully ",emailResponse.response);

        } catch(err){
            // error occur while sending the mail 
            console.log("error occur while sending the mail" , err.message);
            return res.status(500).json({
                success:false,
                message:"error occur while sending the mail",
                error: err.message,
            })
        }


        // return the response 

        return res.status(200).json({
            success:true,
            message:"password reset successfully..."
        })

    } catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"error while updating the password ",
            error : err.message,
        })
    }
}