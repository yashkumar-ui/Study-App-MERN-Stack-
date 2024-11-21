// require the mongoose
const mongoose = require("mongoose");
const mailSender = require("../utilis/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

// create the schema 
const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp : {
        type:String,
        required:true,
    },
    createdAt : {
        type:Date,
        default:Date.now(),
        expires : 10*60,
    }
});

// async function to send the email to the user , when the email is found ----->
async function sendVerificationEmail (email, otp ){
    try{
        const mailResponse = await mailSender(email , "Verification Email From StudyNotion.." , emailTemplate(otp) );
        console.log("Email sent successfully ", mailResponse.response);

    } catch(error){
        console.log("error while sending the mail " , error);
        throw error;
    }
}
otpSchema.pre("save" , async function(next){
    console.log("new document saved to the database ")
    await sendVerificationEmail(this.email , this.otp);
    next();
})



// export the model 
module.exports = mongoose.model("OTP" , otpSchema);