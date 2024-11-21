//require the nodemailer package 
const nodemailer = require("nodemailer");
require("dotenv").config();

// create the mail sender async function 

const mailSender = async (email , title , body ) => {
    try{
        // create the transpoter 
        const transpoter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        // send the mail 
        let info = transpoter.sendMail({
            from : ' StudyNoton || by yash',
            to : `${email}`,
            subject : `${title}`,
            html : `${body}`
        })

        // lets login the mail 
        // console.log(info)

        return info;

    } catch(err){
        console.log(err.message);
        throw err
    }
}

// export the function 

module.exports = mailSender;