import {toast} from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { catalogData } from "../apis"

// Category page details
const {CATALOGPAGEDATA_API} = catalogData

export const getCatalogPageData = async (categoryId) => {
    const toasId = toast.loading("Loading...")
    let result = [];
    try{
        // calls the backend 
        const response = await apiConnector("POST" ,CATALOGPAGEDATA_API , {categoryId} );

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response?.data

    } catch(error){
        console.log("Catalog page API Error -->" , error);
        
    }
    toast.dismiss(toasId);
    return result;
}