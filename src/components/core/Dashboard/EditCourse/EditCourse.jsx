import React, { useEffect, useState } from 'react'
import RenderSteps from '../AddCourse/RenderSteps'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI'
import { setCourse, setEditCourse } from '../../../../slices/courseSlice'

const EditCourse = () => {
    const{token} = useSelector( (state) => state.auth)
    const{course} = useSelector( (state) => state.course)
    // const[loading , setLoading] = useState(false);
    const dispatch = useDispatch();
    const {courseId} = useParams();
    const navigate = useNavigate();
    console.log("course id " , courseId)

    useEffect( () => {
    
        if(courseId){
            // setLoading(true)
            const getCourseDetails  = async () => {
                const response = await getFullDetailsOfCourse(courseId , token)
                // console.log("response -->", response.courseName);
                if(response.courseName){
                    dispatch(setCourse(response))
                    dispatch(setEditCourse(true));
                }
            }
            // setLoading(false);
            getCourseDetails();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <div>
        <h1 className='mb-14 text-3xl text-richblack-5 font-semibold'>
            Edit Course 
        </h1>    
            <div className='mx-auto max-w-[600px]'>
               { course ? (<RenderSteps/>) : 
               (
                <div className='text-pink-200 mt-[4rem] flex flex-col gap-y-7 items-center justify-center text-3xl font-semibold'>
                    No Courses Found
                    <button onClick={ () => navigate("/")} className='lg:text-lg  text-sm px-6 py-3 hover:scale-95 transition-all duration-200 bg-yellow-100 rounded-md text-richblack-900'>Go to Homepage</button>
                </div>
               )}
            </div>
    </div>
  )
}

export default EditCourse