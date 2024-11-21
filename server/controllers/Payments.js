// controller for the payment integration in our application 
const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utilis/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");
const {ObjectId} = mongoose;
const crypto = require("crypto");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessfulEmail");
const CourseProgress = require("../models/CourseProgress");

//capture the payment and initalize the Razorpay order

//capture the payment and initiate the Razorpay order

exports.capturePayment = async (req, res) => {
    //get courseId and UserID
    // it will be the array of coures id 
    const {courses } = req.body;
    const userId = req.user.id;

    if(courses.length === 0){
        return res.status(400).json({
            success:false,
            message:"No course Id will be get from the request"
        })
    }

    // we create the order for all the courses id if the user try to buy many courses 
    // total the amount of all courses
    let total_amount = 0;

    for( const course_id of courses){
        let course;
        
        try{
            // find the course 
            course = await Course.findById(course_id);

            if(!course){
                return res.status(401).json({
                    success:false,
                    message:`could not find the course of this id ${course_id}`,
                })
            }
    
            // check if the user is already pay for this course or not 
    
            // const uid =  new ObjectId(userId);
            const uid = new mongoose.Types.ObjectId(userId)
            console.log("Object id --> ", uid);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(403).json({
                    success:false,
                    message:`Student is already pay for this course -> ${course.courseName}`
                })
            }
            total_amount += course.price

        } catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message: "Error while total the course price",
                error:error
            })
        }
    }

    // lets create the order

    const options = {
        amount: total_amount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
        // notes:{
        //          courseId:,
        //          userId,
        // }
        // 
    }

    // initiate the payment using the razorpay 
    try{
        const paymentResponse = await instance.orders.create(options);
        //log the response 
        console.log("Order create response , ", paymentResponse);
        return res.status(200).json({
            success:true,
            message:"Order created Successfully",
            data : paymentResponse
        })

    } catch(error){
        console.log(error);
        return res.status(200).json({
            success:false,
            message:"Could not initiate the order ",
        })
    }

    //validation
    //valid courseID
    // if(!course_id) {
    //     return res.json({
    //         success:false,
    //         message:'Please provide valid course ID',
    //     })
    // };
    // //valid courseDetail
    // let course;
    // try{
    //     course = await Course.findById(course_id);
    //     if(!course) {
    //         return res.json({
    //             success:false,
    //             message:'Could not find the course',
    //         });
    //     }

    //     //user already pay for the same course
    //     const uid = new ObjectId(userId);
    //     if(course.studentsEnrolled.includes(uid)) {
    //         return res.status(200).json({
    //             success:false,
    //             message:'Student is already enrolled',
    //         });
    //     }
    // }
    // catch(error) {
    //     console.error(error);
    //     return res.status(500).json({
    //         success:false,
    //         message:error.message,
    //     });
    // }
    
    // //order create
    // const amount = course.price;
    // const currency = "INR";

    // const options = {
    //     amount: amount * 100,
    //     currency,
    //     receipt: Math.random(Date.now()).toString(),
    //     notes:{
    //         courseId: course_id,
    //         userId,
    //     }
    // };

    // try{
    //     //initiate the payment using razorpay
    //     const paymentResponse = await instance.orders.create(options);
    //     console.log(paymentResponse);
    //     //return response
    //     return res.status(200).json({
    //         success:true,
    //         courseName:course.courseName,
    //         courseDescription:course.courseDescription,
    //         thumbnail: course.thumbnail,
    //         orderId: paymentResponse.id,
    //         currency:paymentResponse.currency,
    //         amount:paymentResponse.amount,
    //     });
    // }
    // catch(error) {
    //     console.log(error);
    //     res.json({
    //         success:false,
    //         message:"Could not initiate order",
    //     });
    // }
};

// verify the razorpay signature and the server..

exports.verifySignature = async (req,res) => {
    // controller for the verificationn of the payment ....
    // create the webhook secret 
    const webhookSecret = "12345678";

    // create the signature 
    // we will use the HMAC hasing method --> a) hashing algo -> sha256 b) secret key...
    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256" , webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    // check id the signautre and the digest are match or not
    
    if(signature === digest){
        // means the payment is authorized and we have to do these steps 
        // --> add the course id in the user profile 
        // --> enrolled the student in the particular course 
        // send the email of congratulations , you joined the new course 

        console.log("Payment is authiorized");

        // fetch the userid and the courseid from the notes of razorpay transaction 
        const  {courseId , userId} = req.body.payload.payment.entity.notes;

        // perform the action
        try{
            // enrolled the student in the course 
            const enrolledCourses = await Course.findOneAndUpdate(
                { _id : courseId},
                {
                    $push: {studentsEnrolled:userId}
                },
                { new:true},
            );

            // handle the error 
            if(!enrolledCourses){
                return res.status(400).json({
                    success:false,
                    message:"course not found",
                })
            }
            /// log the course
            console.log(enrolledCourses);

            // add the course to the student profile 
            const enrolledStudent = await User.findOneAndUpdate(
                { _id : userId},
                {
                    $push: {courses:courseId}
                },
                { new:true},
            );

            console.log(enrolledStudent);

            // send the mail to the user as confirmation that , you were enrolled in the course 
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Congratulations from CodeHelp",
                "Congratulations, you are onboarded into new CodeHelp Course",
            );

            console.log(emailResponse);

            // return the success 
            return res.status(200).json({
                success:true,
                message:"Signature is verified and you were enrolled in the course",
            });

        } catch(err){
            return res.status(500).json({
                success:false,
                message:err.message,
            })
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:"invalid request",
        })
    }


}

//// verify the payement --> 

exports.verifyPayment = async (req , res) => {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses

    const userId = req.user.id;

    // perform simple validation 
    if(
        !razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId
    ){
        return res.status(400).json({
            success:false,
            message:"Payment failed due to Doesnot fill the requirement",
        })
    }

    // on success of reciving 
    const body = razorpay_order_id + "|" + razorpay_payment_id 

    // created our expected signature 
    const expectedSignature = crypto 
         .createHmac("sha256" , process.env.RAZORPAY_SECRET)
         .update(body.toString())
         .digest("hex")

    // if expected signature macthes withe the real one , then enrolled the student in the course
    
    if(expectedSignature === razorpay_signature){
        // call the function that enrolleds the students in the courses 
        await enrolledStudents(courses , userId ,res);
        // return the response 
        return res.status(200).json({
            success:true,
            message:"Payment Verified SuccessFully..",
        })
    }

    // failure not correct
    return res.status(405).json({
        success:false,
        message:"Payment Failed , doesnot verified .."
    })


}

// enrolled the students 
const enrolledStudents = async (courses , userId , res) => {
    // if the data is missing 
    if(!courses || !userId){
        return res.status(407).json({
            success:false,
            message:"Please provide full details ",
        })
    }

    // enroll students in the courses 
    for (const courseId of courses ){
        try{
            // find the course
            const enrolledCourse = await Course.findByIdAndUpdate(
                {_id : courseId},
                {
                    $push:{ studentsEnrolled : userId},
                },
                { new : true},
            )

            // if we dont get any response 
            if(!enrolledCourse){
                return res.status(403).json({
                    success:false,
                    message:"This course doesnot found",
                })
            }

            // create the course Progreess and add that to the user profile 
           const courseProgress = await CourseProgress.create({
                courseId : courseId,
                userId : userId,
                completedVideos : [],
           })

            // add the course to the student profile 
            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {
                    $push : {
                        courses : courseId,
                        courseProgress : courseProgress._id
                    }
                },
                {new : true},
            )
            // log the student data 
            console.log("Enrolled Student ", enrolledStudent)

            // we can send the mail to the user id as the success also 

            await mailSender(
                enrolledStudent.email,
                `Course Purchased SuccessFully`,
                courseEnrollmentEmail(
                    enrolledCourse.courseName,
                    `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                )
            )


        } catch(error){
            console.log("Enrolled course error ", error);
            return res.status(410).json({
                success:false,
                message:"Error while enrolled the student",
            })
        }

    }
}
// send the mail 
exports.sendPaymentSuccessEmail  = async (req, res) => {

    // fetch the data from the body 
    const {orderId , paymentId , amount } = req.body;
    const userId = req.user.id; 

    if(!orderId || !paymentId || !amount){
        return res.status(400).json({
            success:false,
            message:"All details are required",
        })
    }

    try{
        // find the student details 
        const enrolledStudent = await User.findById(userId);
        // send the mail 

        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount / 100,
                orderId,
                paymentId,
            )
        )

    } catch(error){
        console.log("Payment Success error ", error);
        return res.status(500).json({
            success:false,
            message:"Could not send the email to the user ",
        })
    }
}