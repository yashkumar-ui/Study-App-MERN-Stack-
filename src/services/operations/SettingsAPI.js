import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { settingsEndpoinst } from "../apis";
import {toast} from "react-hot-toast"
import { logout } from "./authAPI";

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
} = settingsEndpoinst


// update the profile picture

export function updateDisplayPicture (token , formData){
    return async (dispatch) => {
        const toastId = toast.loading("loading...")
        try{
            // calls the backend 
            const response  = await apiConnector( "PUT" ,
                UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            )

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            console.log("profile pic update --> " , response);
            toast.success("Profile Picture Updated Successfully");
            dispatch( setUser(response.data.data));
            // update the token in the local storage also
            localStorage.setItem( "user" , JSON.stringify(response.data.data))
            

        } catch(error){
            console.log("Update profile pic API error" , error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId)
    }
}

// update the profile section --> 
export function updateProfile (token , formData){
    return async (dispatch) => {
        const toastId = toast.loading("loading...")
        try{
            // calls the backend
            const response = await apiConnector( "PUT" , UPDATE_PROFILE_API , formData ,
                {   Authorization: `Bearer ${token}` ,}
             )

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            console.log("Profile data update response ---> " , response);
            /// user image 
            const userImage = response?.data?.updatedUserDetails?.image 
            // update the user details in the setUser slice 
            dispatch(setUser({...response.data.updatedUserDetails , image: userImage}))
            // add this in the local storage also 
            localStorage.setItem("user" , JSON.stringify(response.data.updatedUserDetails) )
            // update the data in the User slice also 
            toast.success("profile update Successfully..")

        } catch(error){
            console.log("update Profile API error " , error);
            toast.error(error.response.data.message);

        }
        toast.dismiss(toastId)
    }
}

// delete the user account and navigate the user to the home page 

export function deleteProfile(token , navigate){
    return async (dispatch) => {
        const toasId = toast.loading("Loading...")
        try{
            // call the backend --> delete controller $
            const response = await apiConnector("DELETE" , DELETE_PROFILE_API , null , 
                    {   Authorization: `Bearer ${token}` ,}
             )

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Account delete successfully")

            // navigate the user to the home page --> means we will dispacth the logout function , 
            dispatch(logout(navigate));

        } catch(error){
            console.log("delete account API error" , error)
            toast.error(error.response.data.message);
        }
        toast.dismiss(toasId);
    }
}