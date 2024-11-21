import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {IoAddCircleOutline} from "react-icons/io5"
import {MdKeyboardArrowLeft , MdKeyboardArrowRight } from "react-icons/md"
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI'
import NestedView from './NestedView'



const CourseBuilderForm = () => {
  
  const [loading , setLoading] = useState(false)
  const {token} = useSelector( (state) => state.auth)
  const {course} = useSelector( (state) => state.course)
  const dispacth = useDispatch();
  const [editSectionName , setEditSectionName] = useState(null)

  const {register , getValues ,formState : {errors} , setValue , handleSubmit , } = useForm();
  
  // submit the form 
  const onSubmit  = async (data) => {
     
    // loading true mark krna h 
    setLoading(true)
    let result;

     if(editSectionName){
         // calls the edit section api 
         result = await updateSection({
            sectionName:data.sectionName,
            sectionId : editSectionName,
            courseId : course._id,
         } , token)
     } else{
      // calls the create section api 
         result = await createSection({
            sectionName:data.sectionName,
            courseId: course._id,
         },
        token)
     }

     if(result){
         dispacth(setCourse(result))
         setEditSectionName(null)
         setValue("sectionName", "")
     }
     setLoading(false)
  }

  // function that handle the edit section name change
  const handleChangeEditSectionName = (sectionId , sectionName) => {
    // if the section name is same , just return it 
    if (editSectionName === sectionId){
      cancelEdit()
      return;
    }
    setEditSectionName(sectionId)
    setValue("sectionName" , sectionName)
  }

  // go next function 
  const goNext = () => {
     // check if the section is preseny or not
     console.log("Loge the course Go Next --> ", course);
     if(course.courseContent.length === 0){
      toast.error("Please Add atleast 1 section")
      return;
     }

     if(course.courseContent.some( (section) => section.subSection.length === 0)){
      toast.error("Please add atleast One Lecture")
      return;
     }

     // move to the next page 
     dispacth(setStep(3))
  }

  /// go back function
  const goBack = () => {
    dispacth(setStep(1))
    dispacth(setEditCourse(true))
  }

  // cancel edit button 
  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "")
  }

  return (
    <div className='space-y-8 p-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 '>
       <p className='text-richblack-5 text-2xl font-[500]'>Course Builder</p>
       <form onSubmit={handleSubmit(onSubmit)}>
           <div className='flex flex-col space-y-2 pb-3'>
              <label htmlFor='sectionName' className='text-richblack-5 text-sm ml-1' >Add Section <sup className='text-pink-200'>*</sup></label>
              <input
                type='text'
                name='sectionName'
                id='sectionName'
                disabled={loading}
                placeholder='Add a section to build your course'
                style={{
                   boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                {...register("sectionName" , {required:true})}
              />
              {errors.sectionName && (
                <span className='ml-2 text-pink-200 tracking-wide text-xs'>Section Name is Required</span>
              )}
           </div>
           <div className='flex items-end mt-3 gap-x-4'>
              <button type='submit' className='px-5 py-3 rounded-md bg-richblack-800 border-2 border-yellow-50 flex items-center text-sm font-[400] hover:scale-95 transition-all duration-200 gap-x-2 text-yellow-50'>
                  {editSectionName ? "Edit Section Name " : "Create Section" }
                  <IoAddCircleOutline size={20} className="text-yellow-50" />
              </button>
              {editSectionName && (
                <button type='button' onClick={cancelEdit}
                className='text-sm hover:scale-95 duration-200 transition-all text-richblack-300 underline ' >
                   Cancel Edit
                </button>
              )}
           </div>
       </form>

       {/* show the nested component when the section will be added  */}
       {course.courseContent.length > 0 && (
          <NestedView handleChangeEditSectionName = {handleChangeEditSectionName}/>
       )}

       {/* next or previous button */}
       <div className='flex justify-end gap-x-3'>
          <button  onClick={goBack}
               className={`flex cursor-pointer items-center gap-x-1 rounded-md bg-richblack-300 hover:scale-95 duration-200 transition-all py-[8px] px-[20px] font-[600] text-richblack-900`}
          >
              <MdKeyboardArrowLeft />
               Back
          </button>
          <button onClick={goNext} className='flex items-center px-[20px] py-[8px] font-semibold gap-x-1 hover:scale-95 transition-all duration-200 bg-yellow-50 rounded-md'>
               Next
               <MdKeyboardArrowRight/>
          </button>
       </div>
    </div>
  )
}

export default CourseBuilderForm