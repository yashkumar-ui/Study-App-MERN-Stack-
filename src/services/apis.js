// here we mention all the links , kha pr jana hai 
const BASE_URL = process.env.REACT_APP_BASE_URL


// auth endpoints 
export const endpoints = {
    SENDOTP_API : BASE_URL + "/auth/sendotp",
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
    RESETPASSTOKEN_API : BASE_URL + "/auth/reset-password-token",
    RESETPASSLINK_API : BASE_URL + "/auth/reset-password"
}

//categories api 
export const categories = {
    CATEGORIES_API : BASE_URL + "/course/showAllCategories",
};

//contact us api 
export const contactUsEndpoints = {
    CONTACTUS_API : BASE_URL + "/reach/contact",
};


//settings api 
export const settingsEndpoinst = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API : BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API : BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API : BASE_URL + "/profile/deleteProfile",
};

// Course Endpoints
export const courseEndpoints = {
    COURSE_CATEGORIES_API : BASE_URL + "/course/showAllCategories",
    COURSE_DETAILS_API : BASE_URL + "/course/getCourseDetails",
    CREATE_COURSE_API : BASE_URL + "/course/createCourse",
    EDIT_COURSE_API : BASE_URL + "/course/editCourse",
    CREATE_SECTION_API : BASE_URL + "/course/addSection",
    UPDATE_SECTION_API : BASE_URL + "/course/updateSection",
    DELETE_SECTION_API : BASE_URL + "/course/deleteSection",
    CREATE_SUBSECTION_API : BASE_URL + "/course/addSubSection",
    UPDATE_SUBSECTION_API : BASE_URL + "/course/updateSubSection",
    DELETE_SUBSECTION_API : BASE_URL + "/course/deleteSubSection",
    GET_ALL_INSTRUCTOR_COURES_API : BASE_URL + "/course/getInstructorCourses",
    DELETE_COURSE_API : BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DATA_API : BASE_URL + "/course/getCourseDetails",
    AUTH_FULL_DATA_OF_COURSE_API : BASE_URL + "/course/getFullDataOfCourse",
    CREATE_RATING_API : BASE_URL + "/course/createRating",
    LECTURE_COMPLETE_API : BASE_URL + "/course/updateCourseProgress",
}

// catalog page Data -->
export const catalogData = {
    CATALOGPAGEDATA_API : BASE_URL + "/course/getCategoryPageDetails",
}

// student payment endpoints 
export const studenEndpoints = {
    COURSE_PAYMENT_API : BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API : BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API : BASE_URL + "/payment/sendPaymentSuccessEmail",
}


// proflle endpoints 

export const profileEndpoints = {
    GET_USER_ENROLLED_COURSES_API : BASE_URL + "/profile/getEnrolledCourses",
}