import {toast} from "react-hot-toast";
import { profileEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";


const { GET_USER_ENROLLED_COURSES_API} = profileEndpoints


// get the user enrolled courses 


export const getUserEnrolledCourses = async (token) => {
    const toastId = toast.loading("Loading...")
    let result = [];
    try{
        // call the backend of Enrolled API 
        const response = await apiConnector("GET" , GET_USER_ENROLLED_COURSES_API , null , {
            Authorization: `Bearer ${token}`,
        } )

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        // log the response 
        // console.log("Enrolled Courses success data -->" , response.data);
        result = response.data.data
        
    } catch(error){
        console.log("Get user Enrolled course Error" , error)
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}