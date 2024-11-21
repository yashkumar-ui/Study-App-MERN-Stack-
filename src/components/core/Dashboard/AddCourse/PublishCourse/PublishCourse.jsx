import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {MdKeyboardArrowLeft , MdKeyboardArrowRight} from "react-icons/md"
import { setResetCourse, setStep } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utilis/constants';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';


const PublishCourse = () => {
    const{course} = useSelector( (state) => state.course)
    const dispacth = useDispatch();
    const navigate = useNavigate();
    const [loading , setLoading] = useState(false);
    const {token} = useSelector( (state) => state.auth)

    const{
        register,
        handleSubmit,
        getValues,
        setValue,
    } = useForm()

    useEffect( () => {
        if(course.status === COURSE_STATUS.PUBLISHED){
            setValue("public", true)
        }
    },[])

    const goBack = () => {
        dispacth(setStep(2))
    }

    const goToCourses = () => {
        dispacth(setResetCourse())
        navigate("/dashboard/my-courses")
    }

    // const handleCoursePublish = 
    const handleCoursePublish = async () => {
        // check if the course is publish or not 
        if ( (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true ) || (
            course?.status === COURSE_STATUS.DRAFT && getValues("public") === false
        )){
            goToCourses()
            return;
        }
        // create the form and make the course publish
        const formData = new FormData()
        formData.append("courseId" , course._id)
        const courseStatus  = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
        formData.append("status", courseStatus)
        setLoading(true)
        const result = await editCourseDetails(formData , token);

        if(result){
            goToCourses();
        }
        setLoading(false)

    }

   const onSubmit = () =>{
      handleCoursePublish();
   }


  return (
    <div className='rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
        {/* Publish Course  */}
        <p className='text-2xl text-richblack-5 font-[500]'>Publish Settings</p>
        <form onSubmit={handleSubmit(onSubmit)}>
           <div className=' my-6 mb-8 '>
              <label htmlFor='public'>
                 <input
                    type='checkbox'
                    id='public'
                    {...register("public")}
                     className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                 />
                 <span className='ml-2 text-richblack-400'>
                    Make this course public
                 </span>
              </label>
           </div>

           {/* next prev button */}
           <div className='ml-auto flex max-w-max items-center gap-x-4'>
              <button type='button' onClick={goBack} disabled={loading}
                   className={`flex cursor-pointer items-center gap-x-1 rounded-md bg-richblack-300 hover:scale-95 duration-200 transition-all py-[8px] px-[20px] font-[600] text-richblack-900`}
                >
                    <MdKeyboardArrowLeft />
                  Back
               </button>

               <button  disabled={loading} className='flex items-center px-[20px] py-[8px] font-semibold gap-x-1 hover:scale-95 transition-all duration-200 bg-yellow-50 rounded-md'>
                     Save Changes
                     <MdKeyboardArrowRight/>
               </button>
           </div>

        </form>

    </div>
  )
}

export default PublishCourse