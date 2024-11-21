import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import {RxCross2}  from "react-icons/rx"
import Upload from "../Upload";
import {toast} from "react-hot-toast"
import { createSubSection, updateSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";

export default function SubSectionModal({modalData , setModalData , add = false , view = false, edit=false}) {

    const dispatch = useDispatch();
    const {course} = useSelector( (state) => state.course)
    const {token} = useSelector( (state) => state.auth)
    const [ loading , setLoading ] = useState(false);


    const{
        register,
        handleSubmit,
        getValues,
        setValue,
        formState : {errors}
    } = useForm()
    
    useEffect( () => {
        if(view || edit){
            setValue("lectureTitle" , modalData.title)
            setValue("lectureDesc", modalData.description)
            setValue("lectureVideo", modalData.videoUrl)
        }
    })

    const isFormUpdated = () => {
        const currentValues = getValues()
        if( currentValues.lectureTitle !== modalData.title || 
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        ) {
            return true
        }
        return false
    }
    
    // edit subsection function
    const handleEditSubSection = async () => {
        const currentValues = getValues();
        // create the new Form
        const formData = new FormData();
        formData.append("sectionId", modalData.sectionId)
        formData.append("subSectionId", modalData._id)
        // if the changes happens in the title
        if(currentValues.lectureTitle !== modalData.title){
            formData.append("title" , currentValues.lectureTitle);
        }
        if(currentValues.lectureDesc !== modalData.description){
            formData.append("description" , currentValues.lectureDesc);
        }
        if(currentValues.lectureVideo !== modalData.videoUrl){
            formData.append("video" , currentValues.videoUrl);
        }

        // calls the backend api 
        setLoading(true)
        // const result = await 
        const result = await updateSubSection(formData , token);

        if(result){
            // update the section and add it to the course module
            const updatedCourseContent = course.courseContent.map( (section) =>
                section._id === modalData.sectionId ? result : section
            )
            const updatedCourse = {...course , courseContent : updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }
        setModalData(null)
        setLoading(null)
    }

    const onSubmit = async (data) => {
        // if view is true 
        if(view) return

        // if the form is in edit state
        if(edit){
            // check the form have made changes or not
            if(!isFormUpdated()){
                toast.error("No Changed made to the form ")
            }else{
                // calls the edit subsection function
                handleEditSubSection();
            }
            return;
        }

        // create the subsection
        const formData = new FormData()
        // data -> sectionid , title , descp , video , token 
        formData.append("sectionId" , modalData)
        formData.append("title" , data.lectureTitle)
        formData.append("description", data.lectureDesc)
        formData.append("video", data.lectureVideo)

        setLoading(true)
        // call the api 
        const result = await createSubSection(formData , token);

        if(result){
            // updates the course structure 
            const updatedCourseContent = course.courseContent.map( (section) =>
                section._id === modalData ? result : section
            )
            const updatedCourse = {...course , courseContent : updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }
        setModalData(null);
        setLoading(false)
    }

  return (
    <div className="fixed z-[1000] top-0 left-0 insert-0 !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
       <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
           {/* Modal Header */}
           <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
              <p className="text-xl font-semibold text-richblack-5 tracking-wide">{view && "Viewing"} {add && "Adding"} {edit && "Editng"} lecture </p>
              <button onClick={ () => ( !loading ? setModalData(null) : {})}>
                 <RxCross2 className="text-2xl text-richblack-5" />
              </button>
           </div>

           {/* Modal Form */}
           <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8 py-10">
              {/* lecture video Upload */}
              <Upload
                name="lectureVideo"
                label="Lecture Video"
                register={register}
                setValue={setValue}
                errors={errors}
                video={true}
                videwData={view? modalData.videoUrl : null}
                editData={edit ? modalData.videoUrl : null}
              />

              {/* Lecture title */}
              <div className="flex flex-col space-y-2">
                  <label className=" text-sm font-[300] text-richblack-5 ml-1 " htmlFor="lectureTitle">
                     Lecture Title <sup className="text-pink-200">*</sup>
                  </label>
                  <input
                    type="text"
                    id="lectureTitle"
                    placeholder="Enter lecture title"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                    disabled={view || loading}
                    {...register("lectureTitle", {required:true})}
                  />
                  {errors.lectureTitle && (
                    <span className="text-xs tracking-wide text-pink-200 ml-2" >Lecture title is required</span>
                  )}
              </div>

              {/* Lecture description */}
              <div className="flex flex-col space-y-2"> 
                 <label htmlFor="lectureDesc" className="text-sm font-[300] text-richblack-5">
                      Lecture Description <sup className="text-pink-200">*</sup>
                 </label>
                 <textarea
                    id="lectureDesc"
                    placeholder="Enter Lecture Description"
                    disabled={view || loading}
                    {...register("lectureDesc" , {required:true})}
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full min-h-[130px] rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                 />
                 {errors.lectureDesc && (
                    <span className="text-xs ml-2 text-pink-200 tracking-wide">Lecture description is required</span>
                 )}
              </div>
              {/* view case --> Button -> Disabled */}
              {!view && (
                <div className="flex justify-end">
                    <button type="submit" className="bg-yellow-50 text-[16px] font-semibold hover:scale-95 transition-all duration-200 text-black px-[20px] py-[6px] rounded-md">
                        { edit ? "Save Changes" : "Save"}
                    </button>
                </div>
              )}
           </form>
       </div>
       
    </div>
  )
}
