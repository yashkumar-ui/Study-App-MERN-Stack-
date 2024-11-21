import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProgressBar from "@ramonak/react-progress-bar"
import { useNavigate } from 'react-router-dom';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import toast from 'react-hot-toast';

const EnrolledCourses = () => {
    // fetch the courses in which the student is enrolled 
    const {token} = useSelector( (state) => state.auth);
    const navigate = useNavigate();
    // const TRUNCATE_LENGTH = 10

    // create a array that store the enrolled courses of the students 
    const [enrolledCourses , setEnrolledCourses] = useState();

    useEffect( () => {
        const fetchCourseData = async () => {
            try{
                const response = await getUserEnrolledCourses(token);

                if(!response){
                    toast.error("error while getting the response ")
                }

                const filterPublishCourse = response.filter((ele) => ele.status !== "Draft")
                console.log(response);
                setEnrolledCourses(filterPublishCourse);

            } catch(error){
                console.log("error while fetch the data ")
                toast.error("Error while getting the data")
            }
        }

        fetchCourseData();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


  return (
    <>
        <div className='text-3xl text-richblack-50 '>Enrolled Courses</div>
        { !enrolledCourses ? (
            <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
                <div className='spinner'></div>
            </div>
        ) : !enrolledCourses.length ? 
           (<div className='flex h-[10vh] text-white flex-col gap-y-5 items-center'>
               <p>Your Are not Enrolled in Any courses</p>
               <p>Go and Purchase the courses </p>
               <button onClick={() => navigate("/")} className='text-pink-200'>Go to Courses</button>
           </div>) :
           <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div> }
    </>
  )
}

export default EnrolledCourses