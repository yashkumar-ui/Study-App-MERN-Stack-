import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {RxCross2} from "react-icons/rx"
import { useForm } from 'react-hook-form';
import ReactStars from "react-rating-stars-component";
import { createRating } from '../../../services/operations/courseDetailsAPI';

const CoursereviewModal = ({setReviewModal}) => {
  const {token} = useSelector( (state) => state.auth);
  const {user} = useSelector( (state) => state.profile);
  const {courseEntireData} = useSelector( (state) => state.viewCourse)

  // import useForm things 
  const {
    register,
    handleSubmit,
    setValue,
    formState : {errors},
  } = useForm();

  useEffect( () => {
      setValue("courseExperience", "")
      setValue("courseRating", 0) // eslint-disable-next-line
      // eslint-disable-next-line
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // submit the form 
  const ratingChanged = (newRating) => {
    console.log(newRating)
    setValue("courseRating", newRating)
  }

  const submitFormData = async (data) => {
    // call the backend api 
      console.log("rating -->", data.courseRating);
      console.log("Review", data.courseExperience)
      await createRating({
         courseId : courseEntireData._id,
         rating: data.courseRating,
         review : data.courseExperience,
      } , token)
    // make the modlal unfalse 
    setReviewModal(false);
  }

  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
      <div className='my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-[#F8F9FA]'>
         {/* Modal header  */}
          <div className='flex items-center rounded-t-lg justify-between bg-[#5755D7] p-5'>
             <p className='text-white ml-2 font-light text-xl'>Add Review</p>
             <button onClick={ () => setReviewModal(false)}>
                <RxCross2 className='text-2xl hover:scale-110 hover:text-pink-200 transition-all duration-200 text-richblack-5'/>
             </button>
          </div>

          {/* Modal Body */}
          <div className='p-6'>
              <div className='flex justify-center items-center gap-x-4'>
                 <img
                   src={user?.image}
                   alt={user?.firstName}
                   className='aspect-square w-[70px] rounded-full object-cover'
                 />
                 <div className='flex flex-col '>
                    <p className='font-semibold text-lg text-[#393F41] '>{user?.firstName} {user?.lastName}</p>
                    <p className='text-sm underline text-[#393F41]'>Posting Publicly</p>
                 </div>
              </div>

              {/* form for give the rating to the course */}
              <form onSubmit={handleSubmit(submitFormData)} className='mt-6 flex flex-col'>
                 {/* Rating component  */}
                  <div className='flex justify-center '>
                    <ReactStars
                      count={5}
                      size={24}
                      onChange={ratingChanged}
                      activeColor="#ffd700"
                    />
                  </div>

                 <div className='flex w-[11/12] flex-col space-y-2'>
                    <label htmlFor='courseExperience' className='ml-2'>Add Your Experience <sup className='text-pink-200'>*</sup></label>
                    <textarea
                      id='courseExperience'
                      placeholder='Share details of your own experience for this course...'
                      className=' min-h-[130px] w-full resize-x-none'
                      {...register("courseExperience", {required:true})}
                    />
                    {errors.courseExperience && (
                      <span className='text-xs text-pink-200 ml-2 tracking-wide'> Please Add Your Experience</span>
                    )}
                 </div>
                 <div className='mt-6 flex w-11/12 justify-end gap-x-6'>
                     <button onClick={ () => setReviewModal(false)} className='px-[23px] py-[8px] flex items-center hover:scale-95 hover:bg-[#353737] transition-all duration-200 text-white rounded-md bg-richblack-500 cursor-pointer '>
                        Cancel
                     </button>

                     <button type='submit' className='px-[23px] py-[8px] bg-[#5755D7] rounded-md text-white hover:scale-95 transition-all duration-200 '>
                         Save
                     </button>
                 </div>
              </form>
          </div>
      </div>
    </div>
  )
}

export default CoursereviewModal