import {toast} from "react-hot-toast"
import { courseEndpoints } from "../apis"
import { apiConnector } from "../apiconnector"


// import all the endpoinst

const {
//    COURSE_CATEGORIES_API,
   CREATE_COURSE_API,
   COURSE_DETAILS_API,
   EDIT_COURSE_API,
   CREATE_SECTION_API,
   UPDATE_SECTION_API,
   DELETE_SECTION_API,
   CREATE_SUBSECTION_API,
   UPDATE_SUBSECTION_API,
   DELETE_SUBSECTION_API,
   GET_ALL_INSTRUCTOR_COURES_API,
   DELETE_COURSE_API,
   GET_FULL_COURSE_DATA_API,
   AUTH_FULL_DATA_OF_COURSE_API,
   CREATE_RATING_API,
   LECTURE_COMPLETE_API,
} = courseEndpoints


// add the course 
export const addCourseDetails = async (data , token ) => {
    let result = null
    const toastId = toast.loading("Loading...")

    try{
        // calls the backend and create the new course
        const response = await apiConnector("POST" , CREATE_COURSE_API , data ,{
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        console.log("Create course api response", response)
        if(!response?.data?.success){
            throw new Error(response.data.message)
        }
        toast.success("Course Details added successfully")
        result = response?.data?.data

    } catch(error){
        console.log("Create coure API error" , error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)

    return result
}

// edit the course details 
export const editCourseDetails = async (data ,token) => {
    let result = null
    const toastId = toast.loading("Loading...")

    try{
        // calls the backend on the edit api response 
        const response = await apiConnector("POST" , EDIT_COURSE_API , data ,{
            "Content-Type": "multipart/form-data",
             Authorization: `Bearer ${token}`,
        })

        console.log("edit course api response  ",response )
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("Course details updated successfully")
        result = response?.data?.data

    } catch(error){
        console.log("edit course API error ", error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
    return result
}

// create a new  section  
export const createSection = async ( data , token ) => {
    let result = null 
    const toastId = toast.loading("loading...")
    try{
        // calls the backend create section api 
        const response = await apiConnector( "POST" , CREATE_SECTION_API , data, {
            Authorization: `Bearer ${token}`,
        } )

        if(!response?.data?.success){
            throw new Error(response.data.message)
        }
        // show the toast
        toast.success("Course Section created ")
        result = response?.data?.updatedCourse

    } catch(error){
        console.log("Create section API error =>" , error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
    return result 
}

// updates the section 

export const updateSection = async (data , token) => {
    let result = null
    const toastId = toast.loading("loading..")
    try{
        // calls the upadate section backend api 
        const response = await apiConnector("POST" , UPDATE_SECTION_API , data , {
            Authorization: `Bearer ${token}`,
        })

        if(!response?.data?.success){
            throw new Error(response.data.message)
        }
        toast.success("Course Section Updated")

        result = response?.data?.data

    } catch(error){
        console.log("Update Section API Error" , error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
    return result 
}

// delete the section 

export const deleteSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", DELETE_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Section")
      }
      toast.success("Course Section Deleted")
      result = response?.data?.data
    } catch (error) {
      console.log("DELETE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }


  // create a new Subsection
  export const createSubSection = async (data, token) => {
     const toastId = toast.loading("loading...")
     let result = null;
     try{
        // call the backen API of the create subsection 
        const response = await apiConnector("POST" , CREATE_SUBSECTION_API , data , {
            Authorization : `Bearer ${token}`,
        } )
        console.log("Subsection BD APi --> response", response)
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Lecture Added Successfully")
        result = response?.data?.data

     } catch(error){
        console.log("Create subsection BD API Error -> ", error)
        toast.error(error.response.data.message)
     }
     toast.dismiss(toastId)
     return result 
  }

  // update the subsection --> 
  export const updateSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
    //   console.log("UPDATE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error(response.data.message)
      }
      toast.success("Lecture Updated Successfully")
      result = response?.data?.data
    } catch (error) {
      console.log("UPDATE SUB-SECTION API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
    return result
  }
  


  // delete the subsection -->
  export const deleteSubSection = async(data , token) => {
    let result = null
    const toastId = toast.loading("Loading....")
    try{
        // calls the backend --> deletSubsection API 
        const response = await apiConnector("POST" , DELETE_SUBSECTION_API , data , {
            Authorization: `Bearer ${token}`,
        })

        if(!response?.data?.success){
            throw new Error(response.data.message)
        }
        toast.success("Lecture Deleted Successfully")
        result = response?.data?.data
    } catch(error){
        console.log("Delete subsection BD api error -> ", error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
    return result
  }

  // get all the courses of the instuctor 
  export const getAllInstructorCourses = async (token) => {
      let result = [];
      const toastId = toast.loading("Loading...")
      try{
        // call the backend to fetch all the instrucor courses 
        const response = await apiConnector("GET" , GET_ALL_INSTRUCTOR_COURES_API , null ,{
            Authorization: `Bearer ${token}`,
        } )

        if(!response?.data?.success){
            throw new Error(response.data.message)
        }
        // console.log("Instructor courses API response", response.data.data);
        result = response?.data?.data
        

      } catch(error){
        console.log("Get Instructor course API error", error)
        toast.error(error.response.data.message);
      }
      toast.dismiss(toastId);
      return result;
  }

  //delete a course 
  export const deleteCourse = async (data , token) => {
    const toastId  = toast.loading("loading...")
    try{
        // call the backend api 
        console.log("APi -=>" , data);
        const response = await apiConnector("DELETE" , DELETE_COURSE_API , data , {
            Authorization: `Bearer ${token}`,
        });

        if(!response?.data?.success){
            throw new Error(response.data.message);
        }
        toast.success("course deleted successfully..")
    } catch(error){
        console.log("Error of Delete course api --> ", error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  }

  // get full details of the course 
  export const getFullDetailsOfCourse = async (courseId , token) => {
    const toastId = toast.loading("Loading..");
    let result = null;
    try{
        // calls the backend FUll course details api
        const response = await apiConnector("POST" , GET_FULL_COURSE_DATA_API,  {courseId }, {
            Authorization: `Bearer ${token}`,
        }  )

        
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        // add the data of response in the resilt 
        console.log("COures detial ", response);
        result = response?.data?.data?.courseDetails[0]
        // console.log("GEt Course api response" , response);
        // console.log("course name --> ", result.courseName);

    } catch(error){
        console.log("Error of getCourse Details APi", error )
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result ;
  }

  // get ALL DATA of the course --->
  export const getFullDataOfCourse = async(courseId , token ) => {
        const toastId = toast.loading("Loading..")
        let result = null
        try{
            // call the backend and get the data 
            const response = await apiConnector("POST" , AUTH_FULL_DATA_OF_COURSE_API , {courseId} , {
                Authorization: `Bearer ${token}`,
            })

            if(!response.data.success){
                throw new Error(response.data.message);
            };
            console.log("Log the full course data -->" , response);
            result = response?.data?.data

        } catch(error){
            console.log("Full Data of COurse API error -->", error);
            toast.error(error.response.data.message)
        }
        toast.dismiss(toastId);
        return result;


  }
 
  // fetch the course details 
  export const fetchCourseDetails = async(courseId) => {
     const toastId = toast.loading("Loading..")
     let result = null;
     try{
        // calls the bakend 
        // console.log("course id frontend", courseId);
        const response = await apiConnector("POST",COURSE_DETAILS_API ,{courseId});

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        // add the data in the result 
        result = response.data.data;

     } catch(error){
        console.log("COURSE Details API error ==>", error);
        toast.error(error.response.data.message);
     }
     toast.dismiss(toastId);
     return result;
  }

  // create a rating of course 
  export const createRating = async (data, token) => {
     const toastId = toast.loading("Loading...")
     let success = false
     try{
        // call the backend api 
        console.log("data--<", data)
        const response = await apiConnector( "POST" , CREATE_RATING_API , data ,{
            Authorization: `Bearer ${token}`,
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Rating Created Successfully..")
        success = true

     } catch(error){
        success = false
        console.log("Create Rating API error ---> ", error);
        toast.error(error.response.data.message)
     }
     toast.dismiss(toastId);
     return success;
  }

  // mark the leacture as complete 
  export const markLectureComplete = async (data , token) => {
      const toastId = toast.loading("Loading....")
      let result = null;
      try{
        // calls the backend api 
         const response = await apiConnector( "POST", LECTURE_COMPLETE_API , data , {
            Authorization: `Bearer ${token}`,
         })

         if(!response.data.success){
            throw new Error (response.data.message);
         }

         toast.success("Lecture Completed");
         result = true;

      } catch(error){
          console.log("Video Complete API error --> ", error)
          toast.error(error.response.data.message);
          result = false;
      }
      toast.dismiss(toastId);
      return result 
  }