// import the essential requirements 
const mailSender = require("../utilis/mailSender")
const {contactUsEmail} = require("../mail/templates/contactFormRes")
const {adminContactForm} = require("../mail/templates/adminContactForm");

exports.contactUsController = async (req,res) => {
    try{
        // fetch the data from the body 
        const {firstname , lastname , email , phoneNo , message , countryCode } = req.body;

        // send the mail to the admin 
        const adminMail = "yashiosdev2@gmail.com"

        await mailSender( 
            adminMail , 
            `${firstname} has fill the contact Form..`,
            adminContactForm(firstname , lastname , email , phoneNo , countryCode , message)
        )

        // send mail to the user , 
        await mailSender(
            email,
            "your data send successfully",
            contactUsEmail( firstname , lastname , email , phoneNo , countryCode , message)
        )


        // return the success response after sending the mail 
        return res.status(200).json({
            success:true,
            message:"Email sent successfully .....",
        })

    } catch(err){
        console.log("error occur while send the mail" , err);
        console.log("error message " , err.message);
        return res.status(500).json({
            success:false,
            message:"error while sending the mail in contactUS page"

        })
    }
}