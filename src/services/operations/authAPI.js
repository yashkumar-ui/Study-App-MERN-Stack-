// here all the backend calls will be written 
import { setLoading  , setToken} from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { toast } from "react-hot-toast";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";



const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSLINK_API
} = endpoints

// send otp function that calls the backend 

export function sendOtp (email , navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading..")
        // make the loading true
        dispatch(setLoading(true));
        try{
            // call the backend 
            const response = await apiConnector("POST" , SENDOTP_API , {
                email , 
                checkUserPresent: true,
            })
            // consol the log in casually 
            console.log("send otp api response " , response);

            // if not success 
            if(!response.data.success){
                throw new Error(response.data.message)
            }

            // at success ---> show toast and navigate to the verify - email page 
            toast.success("Otp Sent Successfully");
            navigate("/verify-email");

        } catch(error){
            // in this case , log the error and show the toast 
            console.log("end otp api error" , error);
            toast.error(error.response.data.message);
        }

        // make the loading false 
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

// signup function that calls the backend 
export function Signup (
    accountType , 
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading..")
        dispatch(setLoading(true))
        try{
            // call the signup api in the backend 
            const response = await apiConnector("POST" , SIGNUP_API , {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                accountType,
                otp
            })

            console.log("SIGN UP api success response ---> " ,response);
            // if the response doesnot go success 
            if(!response.data.success){
                throw new Error(response.data.message)
            }

            // if success -----> show the toast and navigate to the login page 
            toast.success("Signup Successful")
            navigate("/login")

        } catch(error){
            console.log("signup api error ---> ", error);
            toast.error(error.response.data.message)
            // navigate("/signup");

        }
        dispatch(setLoading(false))
        toast.dismiss(toastId);
    }

}

// login function for the backend calling 

export function Login (email , password , navigate ) {
    return async (dispatch) => {
        // set the loading true
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            // call the backend for the login of user 
            const response = await apiConnector("POST" , LOGIN_API , {
                email , password,
            }) 

            console.log("Login API response ----> ", response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            // if yes , show the success toast and do the further steps 
            toast.success("Login successfully")
            // add token in the slice ---> setToken 
            dispatch(setToken(response.data.token))

            // for the user image , if the image doesnot created , then we add the user image here 
            const userImage = response.data?.user?.image ? response.data.user.image : ` https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({ ...response.data.user, image: userImage }))

            // add the token to the local storage 
            localStorage.setItem("token" ,JSON.stringify(response.data.token) )
            //add the user to the local storage for further
            localStorage.setItem("user" ,JSON.stringify(response.data.user) )
            // navigate to the dashboard page 
            navigate("/dashboard/my-profile");

        } catch(error){
            console.log("Login api error --->" , error);
            toast.error(error.response.data.message)
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId);
    }
}

// logout function 
export function logout (navigate) {
    return async (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logout Successfully")
        navigate("/")
    }
}

// get password reset Token 
export function getPasswordResetToken (email , setEmailSent) {
    return async (dispatch) => {
        // set the loading true 
        dispatch(setLoading(true))
        try{
            // call the backend for the email sent 
            const response = await apiConnector("POST" , RESETPASSTOKEN_API , {email} )

            // log the response 
            console.log("Reste Password Link response --> ", response)

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent Successfully..")
            setEmailSent(true)

        } catch(error){
            console.log("Reste password APi error ---->" , error);
            toast.error(error.response.data.message)
        }
        dispatch(setLoading(false))
    }

}

// reset the password 

export function resetPassword ( password , confirmPassword , token , navigate) {
    return async (dispatch) => {
        const toasId = toast.loading("Loading....")
        dispatch(setLoading(true))
        try{
            // calls the backend for the resetPassword 
            const response = await apiConnector("POST" , RESETPASSLINK_API , {password , confirmPassword , token})

            // log the response 
            console.log("Reset password API ----> ", response);
            if(!response.data.success){
                throw new Error(response.data.message);
                
            }
            // show the toast and navigate the user to the login page 
            toast.success("Password Reset Successfully");
            navigate("/login");

        } catch(error){
            console.log("error in restePassword API " , error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toasId);
        dispatch(setLoading(false))
    }
}

