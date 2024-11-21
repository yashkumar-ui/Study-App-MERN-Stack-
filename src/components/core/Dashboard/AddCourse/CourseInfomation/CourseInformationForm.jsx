import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {toast} from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../../../../../services/apiconnector';
import { courseEndpoints } from '../../../../../services/apis';
import ChipInput from './ChipInput';
import RequirementsField from './RequirementsField';
import Upload from '../Upload';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import { MdNavigateNext } from "react-icons/md"
import { COURSE_STATUS } from '../../../../../utilis/constants';
import { addCourseDetails, editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';

const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState : {errors },
    } = useForm();

    const {token} = useSelector( (state) => state.auth)
    const {course , editCourse } = useSelector( (state) => state.course )
    const [ loading , setLoading ] = useState(false)
    const [courseCategories , setCourseCategories ] = useState([])
    const dispacth = useDispatch();

    const fetchAllCategories = async () => {
        try{
            const response = await apiConnector("GET" , courseEndpoints.COURSE_CATEGORIES_API )

            setCourseCategories(response.data.allCategory)
            console.log("all categories -->" , response.data.allCategory )

        } catch(error){
            console.log("course category api error", error)
        }
    }

    useEffect( () => {
        // if the form is in edit mode 
        if(editCourse){
            setValue("courseTitle" , course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage",course.thumbnail)
        }

        fetchAllCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const isFormUpdated = () => {
        const currentValues = getValues()
        if(
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseRequirements.toString() !==
            course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail
        ){
            return true
        }
        return false
    }
 

    // on submit the form 
    const onSubmit = async (data) => {
        console.log("data of simple form " , data)

        // check if the form is in edit state or not
        if (editCourse){

            if( isFormUpdated() ){
                const currentValues = getValues();
                const formData = new FormData()

                formData.append("courseId", course._id)
                if(currentValues.courseTitle !== course.courseName){
                    formData.append("courseName", data.courseTitle)
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc)
                }
                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice)
                }
                if (currentValues.courseTags.toString() !== course.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.courseTags))
                }
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits)
                }
                if (currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory)
                }
                if (
                    currentValues.courseRequirements.toString() !==
                    course.instructions.toString()
                ) {
                    formData.append(
                      "instructions",
                      JSON.stringify(data.courseRequirements)
                    )
                }
                if (currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage)
                }
                
                /// call the editCOurse details api
                setLoading(true)
                const result = await editCourseDetails(formData , token)
                setLoading(false)

                if(result){
                    dispacth(setStep(2))
                    dispacth(setCourse(result))
                }

            }else{
                toast.error("No changes made to the form ")
            }
            return;
        } 

        // create the form  and add the data 
        let formData = new FormData()
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("status", COURSE_STATUS.DRAFT )
        formData.append("instructions",JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage", data.courseImage)

        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }
        
        setLoading(true)

        // call the backend and add the data 
        // console.log("couse form data ---<" , formData)
        const result = await addCourseDetails(formData , token)

        if(result){
            dispacth(setStep(2))
            dispacth(setCourse(result))
        }
        setLoading(false)

    }
    

  return (
    <form  onSubmit={handleSubmit(onSubmit)}
       className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
         {/* course title */}
         <div className='flex flex-col space-y-2'>
             <label htmlFor='courseTitle' className='text-sm font-[300] ml-1 text-richblack-5'>
                Course title <sup className='text-pink-200'>*</sup>
             </label>
             <input
               id='courseTitle'
               type='text'
               name='courseTitle'
               placeholder='Enter Course Title'
               style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
               }}
               className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
               {...register("courseTitle" , {required:true})}
             />
             {errors.courseTitle && (
                <span className='ml-2 text-xs text-pink-200 tracking-wide -mt-1'>
                    Course title is required
                </span>
             )}
         </div>

         {/* course description */}
         <div className='flex flex-col space-y-2'>
            <label htmlFor='courseShortDesc' className='text-sm text-richblack-5 font-[300] ml-1'>
                Course Short Description <sup className='text-pink-200'>*</sup>
            </label>
            <textarea
                type='text'
                id='courseShortDesc'
                name='courseShortDesc'
                placeholder='Enter description'
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full min-h-[130px] rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                {...register("courseShortDesc" , {required:true})}
            />
            {errors.courseShortDesc && (
                <span className='text-pink-200 tracking-wide text-xs -ml-1 '>
                    Course description is required
                </span>
            )}
         </div>

         {/* Course price */}

         <div className="flex flex-col space-y-2">
              <label className="text-sm text-richblack-5 ml-1 font-[300]" htmlFor="coursePrice">
                    Course Price <sup className="text-pink-200">*</sup>
              </label>
              <div className="relative">
                   <input
                      id="coursePrice"
                      placeholder="Enter Course Price"
                      {...register("coursePrice", {
                           required: true,
                           valueAsNumber: true,
                           pattern: {
                               value: /^(0|[1-9]\d*)(\.\d+)?$/,
                            },
                       })}
                       className="form-style w-full !pl-12"
                    />
                    <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
              </div>
               {errors.coursePrice && (
                   <span className="ml-2 text-xs tracking-wide text-pink-200">
                       Course Price is required
                   </span>
                )}
         </div>

         {/* course Category */}
         <div className='flex flex-col space-y-2'>
            <label className='text-sm text-richblack-5 font-[300] ml-1'>
                Category<sup className='text-pink-200'>*</sup>
            </label>
            <select 
                {...register("courseCategory" , {required:true})}
                defaultValue=""
                id='courseCategory'
                style={{
                   boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                 className="w-full cursor-pointer rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"

            >
                 <option value="" disabled >Choose a category</option>
                 {
                    courseCategories.map( (exe , i) => (
                        <option key={i} value={exe?._id}>
                            {exe?.name}
                        </option>
                    ))
                 }
            </select>
            {errors.courseCategory && (
                <span className='text-pink-200 text-xs tracking-wide ml-2'>
                    Course Category is required
                </span>
            )}
         </div>

         {/* important component --> add tags in the course */}
         {/* course tags */}
         <ChipInput
            label = "Tags"
            name  = "courseTags"
            placeholder = "Enter tags and press enter"
            register = {register}
            errors = {errors}
            setValue = {setValue}
            getValues = {getValues}
         />

         {/* course thumbnail Image upload function */}
         <Upload
            name="courseImage"
            label="Course Thumbnail"
            errors={errors}
            register={register}
            setValue = {setValue}
            editData = {editCourse ? course?.thumbnail : null}
         />

         {/* benifits of the course  */}

         <div className='flex flex-col space-y-2'>
            <label htmlFor='courseBenefits' className='text-sm ml-1 text-richblack-5 font-[300]'>
                Benefits of the course <sup className='text-pink-200'>*</sup>
            </label>
            <textarea
                type='text'
                id='courseBenifits'
                name='courseBenifits'
                placeholder='Enter Benifits of the course'
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full min-h-[130px] rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                {...register("courseBenefits" , {required:true})}
            />
            {
                errors.courseBenfits && (
                    <span className='text-xs ml-2 text-pink-200 tracking-wide'>
                        Benifits of the course is required
                    </span>
                )
            }
            
         </div>

         {/* requirements and the instructions */}

         <RequirementsField 
            name = "courseRequirements"
            placeholder="Enter Instructions of the course"
            label="Requirements/Instructions"
            errors = {errors}
            register = {register}
            getValues = {getValues}
            setValue = {setValue}
         />

         {/* NextButton */}
         <div className='flex justify-end gap-x-2'>
            {/* if the user comes again with edit option */}
            {editCourse && (
                <button 
                  onClick={ () => dispacth(setStep(2))}
                  disabled={loading}
                  className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                >
                    Continue withour saving 
                </button>
            )}
            <button disabled={loading} 
               className='flex flex-row items-center gap-x-1 cursor-pointer hover:scale-95 duration-200 transition-all group rounded-md py-[8px] px-[20px] font-[500] text-richblack-900 bg-yellow-50 '
            >
                {
                    !editCourse ? "Next" : "Save Changes"
                }
                <MdNavigateNext />
            </button>

         </div>




    </form>
  )
}

export default CourseInformationForm