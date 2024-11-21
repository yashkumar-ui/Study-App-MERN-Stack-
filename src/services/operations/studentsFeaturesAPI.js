import toast from "react-hot-toast";
import { studenEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const { COURSE_VERIFY_API , SEND_PAYMENT_SUCCESS_EMAIL_API , COURSE_PAYMENT_API} = studenEndpoints


// load the razorpay SDK from the CDN

function loadScript(src) {
    return new Promise( (resolve) => {
        const script = document.createElement("script");
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


// Buy the course 
export async function BuyCourse(token , courses , user_details , navigate , dispatch) {
    // set the loading 
    const toastId = toast.loading("Loading...");
    try{
        // loading the script of razorpay SDK
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        // if it doesnot load it , then show the tost 
        if(!res){
            toast.error("RazorPay SDK failed to load , please try again later")
            return;

        }

        // initting the order in the backend 
        const orderResponse = await apiConnector("POST" , COURSE_PAYMENT_API , {courses} , {
            Authorization: `Bearer ${token}`,
        } )

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message)
        }

        /// log the order 
        console.log("Order initiate Backend currency -->" , orderResponse.data);

        // openning the Razorpay SDK....
        const options = {
            key : process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name:"StudyNotion",
            description: "Thank you for Purchashing the Courses.",
            image : rzpLogo,
            prefill : {
                name: `${user_details.firstName} ${user_details.lastName}`,
                email: user_details.email,
            },
            handler: function (response) {
                // send payment success mail 
                console.log("Response ---> Success " ,response );
                console.log("ID" , response.razorpay_order_id);
                sendPaymentSuccessEmail(response , orderResponse.data.data.amount ,token)
                // verify the payment 
                verifyPayment({...response , courses} , token , navigate , dispatch )
            },
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on( "payment.failed", function (response) {
            toast.error("Oops ! payment failed ")
            console.log(response.error)
        })


    } catch(error){
        console.log("Payment API Error  -->",error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}

///verify the payment 
async function verifyPayment (bodyData  , token , navigate , dispatch ) {
    const toastId = toast.loading("Loading...");
    // make the payment loading true
    dispatch(setPaymentLoading(true));
    try{
        // console.log("Body data -->", bodyData);
        // call the backend of verify payment 
        const response = await apiConnector("POST" , COURSE_VERIFY_API , bodyData ,{
            Authorization: `Bearer ${token}`,
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        // on success
        toast.success("Payment Successfull , you are added to the course")
        // navigate the user to the enrolled course route 
        navigate("/dashboard/enrolled-courses");
        // reset the cart
        dispatch(resetCart());

    } catch(error){
        console.log("Payment Verify Error", error);
        toast.error()
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false))
}


// send the email on success of payment 
async function sendPaymentSuccessEmail(response , amount , token){
    try{
        // call the backend Send Mail controller
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API , 
            {
                orderId : response.razorpay_order_id,
                paymentId : response.razorpay_payment_id,
                amount,
            },
            {
            Authorization: `Bearer ${token}`,
        } )

    } catch(error){
        console.log("Payment Success API error ---> ", error);
    }
}