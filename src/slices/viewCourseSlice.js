import { createSlice } from "@reduxjs/toolkit";

//declare intital states 
const initialState = {
    courseSectionData : [],
    courseEntireData : [],
    completedLectures : [],
    totalNoOfLectures : 0,
}

// create the sclic ]

const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers: {
        setCourseSectionData : (state , action) => {
            state.courseSectionData = action.payload
        },
        setEntireCourseData : (state , action) => {
            state.courseEntireData = action.payload
        },
        setTotalNoOfLectures : (state , action) => {
            state.totalNoOfLectures = action.payload
        },
        setCompletedLectures : (state , action) => {
            state.completedLectures = action.payload
        },
        updatedCompletedLectures : (state , action) => {
            state.completedLectures = [...state.completedLectures , action.payload]
        },
    },
})

// export all the function 

export const {
    setCourseSectionData,
    setEntireCourseData,
    setTotalNoOfLectures,
    setCompletedLectures,
    updatedCompletedLectures,
} = viewCourseSlice.actions 

export default viewCourseSlice.reducer