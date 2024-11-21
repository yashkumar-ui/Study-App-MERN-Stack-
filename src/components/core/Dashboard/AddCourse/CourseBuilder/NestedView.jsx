import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {RxDropdownMenu} from "react-icons/rx"
import {MdEdit} from "react-icons/md"
import {RiDeleteBin6Line} from "react-icons/ri"
import { FaPlus } from 'react-icons/fa'
import ConfirmationModal from '../../../../common/ConfirmationModal'
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice'
import  SubSectionModal 
 from './SubSectionModal'

const NestedView = ({handleChangeEditSectionName}) => {
    const {course} = useSelector( (state) => state.course)
    const {token} = useSelector( (state) => state.auth)
    const dispatch = useDispatch();

    // fields to track the --[add , view , edit ]
    const[addSubSection , setAddSubSection] = useState(null)
    const[viewSubSection, setViewSubSection] = useState(null)
    const[editSubSection , setEditSubSection] = useState(null)
    // track of confirmation modal --->>>> 
    const[confirmationModal , setConfirmationModal] = useState(null)


    // delete the section
    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection( {sectionId , courseId: course._id} , token)
        if(result){
            dispatch(setCourse(result))
        }
        setConfirmationModal(null)
    }

    // handle delete the subsection
    const handleDeleteSubSection = async (subSectionId , sectionId) => {
        const result = await deleteSubSection({sectionId , subSectionId} , token)
        if(result){
            const updatedCourseContent = course.courseContent.map( (section) => 
              section._id === sectionId ? result : section
            ) 
            const updatedCourse = {...course , courseContent : updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }
        setConfirmationModal(null);
    }


  return (
    <>
        {/* section add component */}
        <div className="rounded-lg bg-richblack-700 p-6 px-8"
        id="nestedViewContainer">
           {
              course?.courseContent?.map( (section) => (
                  // section dropdown
                  <details key={section._id} open>
                       <summary className='flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2'>
                          <div className='flex items-center gap-x-3'>
                           <RxDropdownMenu className="text-2xl text-richblack-50" />
                            <p className='text-white'>{section.sectionName}</p>
                          </div>

                          {/* button --> edit + delete */}
                          <div className='flex items-center gap-x-3'>
                              {/* edit - section name button */}
                              <button onClick={ () => handleChangeEditSectionName(section._id , section.sectionName)} >
                                 <MdEdit className="text-xl text-richblack-300 hover:scale-95 duration-200 transition-all hover:text-richblack-900" />
                              </button> 
                              {/* delete section button*/}
                              <button onClick={ () =>
                                setConfirmationModal({
                                    text1 : "Delete this Section?.",
                                    text2 : "Are you sure?",
                                    btn1Text : "Delete",
                                    btn2Text : "Cancel",
                                    btn1Handler: () => handleDeleteSection(section._id),
                                    btn2Handler: () => setConfirmationModal(null)
                                 })
                               }>
                                  <RiDeleteBin6Line className="text-xl hover:scale-95 duration-200 transition-all text-richblack-300 hover:text-richblack-900" />
                              </button>

                          </div>
                       </summary>
                        <div className='px-6 pb-4'>
                            {/* renders all the subSection  */}
                            {
                                section.subSection.map( (data) => (
                                    <div key={data._id} onClick={() => setViewSubSection(data)}  className='flex items-center justify-between gap-x-3 border-b-2 py-2 border-b-richblack-600'>
                                        {/* subsection - name  */}
                                        <div className='flex items-center gap-x-3 py-2'>
                                           <RxDropdownMenu className="text-2xl text-richblack-50" />
                                           <p className='font-semibold text-richblack-50'>{data.title}</p>
                                        </div>

                                        {/* edit + delete subsection */}
                                        <div onClick={(e) => e.stopPropagation() } className='flex items-center gap-x-3'>
                                           <button onClick={ () => setEditSubSection({...data, sectionId : section._id}) }>
                                              <MdEdit className="text-xl text-richblack-300 hover:scale-95 duration-200 transition-all hover:text-richblack-900" />
                                           </button>
                                           {/* delete the subsection */}
                                           <button onClick={ () => setConfirmationModal({
                                                 text1: "Delete this Sub-Section ?",
                                                 text2: "This Lecture will be deleted",
                                                 btn1Text:"Delete",
                                                 btn2Text:"Cancel",
                                                 btn1Handler: () => handleDeleteSubSection(data._id , section._id) ,
                                                 btn2Handler : () => setConfirmationModal(null)

                                           })}>
                                               <RiDeleteBin6Line className="text-xl hover:scale-95 duration-200 transition-all text-richblack-300 hover:text-richblack-900" />
                                           </button>
  
                                        </div>
                                    </div>
                                ))
                            }
                            {/* create subsection button */}
                            <button onClick={() => setAddSubSection(section._id)} className='flex items-center mt-3 text-yellow-50 hover:scale-95 transition-all duration-200 gap-x-1'>
                                <FaPlus className='text-lg'/>
                                Add lecture
                            </button>

                        </div>

                  </details>
              ))
           }
        </div>

        {/* Modal display  */}
        {
            addSubSection ? (
            <SubSectionModal
                modalData = {addSubSection}
                setModalData = {setAddSubSection}
                add={true}
            />) : viewSubSection ? (
                <SubSectionModal
                    modalData = {viewSubSection}
                    setModalData = {setViewSubSection}
                    view = {true}
                />
            ) : editSubSection ? (
                <SubSectionModal
                    modalData = {editSubSection}
                    setModalData = {setEditSubSection}
                    edit = {true}
                />
            ) : (
                <></>
            )
        }

        {/* ConfirmationModal */}
        { confirmationModal ? (
                <ConfirmationModal modalData={confirmationModal} />
            ) : (<></>)}
    </>
  )
}

export default NestedView