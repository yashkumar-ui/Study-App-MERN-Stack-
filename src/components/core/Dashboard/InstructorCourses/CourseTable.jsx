import React, { useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { formatDate } from '../../../../services/formatDate'
import { COURSE_STATUS } from '../../../../utilis/constants'
import {HiClock } from "react-icons/hi"
import { FaCheck } from 'react-icons/fa'
import {FiEdit2} from "react-icons/fi"
import {RiDeleteBin6Line} from "react-icons/ri"
import ConfirmationModal from '../../../common/ConfirmationModal'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteCourse, getAllInstructorCourses } from '../../../../services/operations/courseDetailsAPI'


const CourseTable = ({courses , setCourses}) => {

    const {token} = useSelector( (state) => state.auth);
    const navigate = useNavigate();
    const [confirmationModal , setConfirmationModal] = useState(null);
    const[loading , setLoading] = useState(false);
    
    const deleteCourseHandler = async (courseId) => {
        setLoading(true);
        console.log("course Id ---> " , courseId);
        await deleteCourse( {courseId : courseId}, token);
        const result = await getAllInstructorCourses(token);
        if(result){
            setCourses(result);
        }
        setConfirmationModal(null);
        setLoading(false);
    }

    
  return (
    <>
        <Table className='rounded-xl border border-richblack-800'>
            <Thead>
                <Tr className='flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-3'>
                    <Th className='flex-1 font-[300] uppercase text-left text-sm  text-richblack-100'>Courses</Th>
                    <Th className='text-left font-[300] uppercase text-richblack-100 text-sm' >Duration</Th>
                    <Th className='text-left font-[300] uppercase text-richblack-100 text-sm' >Prices</Th>
                    <Th className='text-left font-[300] uppercase text-richblack-100 text-sm' >Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    courses.length === 0 ? (
                        <Tr>
                            <Td className='py-10 text-center text-2xl font-medium text-richblack-100'>No Courses Found</Td>
                        </Tr>
                    ) :
                     (
                        courses.map( (course) => (
                            <Tr key={course._id} className='flex gap-x-10 border-b border-richblack-800 px-6 py-8'>
                               <Td className='flex flex-1 gap-x-4'>
                                  <img
                                    src={course?.thumbnail}
                                    alt={course?.courseName}
                                    className='h-[148px] w-[220px] rounded-lg object-cover'
                                  />
                                  <div className='flex flex-col justify-between'>
                                      <p className='text-lg font-semibold tracking-wide text-richblack-5'>{course.courseName}</p>
                                      <p className='text-sm text-richblack-300'>
                                        {course.courseDescription}
                                      </p>
                                      <p className='text-[12px] text-richblack-5'>
                                         Created: {formatDate(course.createdAt)}
                                      </p>
                                      {
                                        course.status === COURSE_STATUS.DRAFT ? (
                                            <p className='flex w-fit flex-row items-center gap-x-2 rounded-full bg-richblack-700 px-3 py-[2px] text-[12px] font-medium text-pink-200'>
                                              <HiClock size={14} />
                                               Drafted
                                            </p>
                                        ) : (
                                            <p className='w-fit flex flex-row items-center gap-x-2 rounded-full bg-richblack-700 px-3 py-[2px] text-[12px] font-medium text-yellow-50'>
                                                <div className='flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700'>
                                                  <FaCheck size={8} />
                                                </div>
                                                Published
                                            </p>
                                        )
                                      }
                                  </div>
                               </Td>
                               <Td className='text-sm font-medium text-richblack-100'>
                                  2hr 30min
                               </Td>
                               <Td className='text-sm font-medium text-richblack-100'>
                                  ₹{course.price}
                               </Td>
                               <Td className='text-sm font-medium text-richblack-100'>
                                  <div className='flex flex-row gap-x-3'>
                                     <button disabled={loading} onClick={ () => {navigate(`/dashboard/edit-course/${course._id}`)}}  className='hover:scale-110 transition-all duration-200 hover:text-caribbeangreen-300'>
                                        <FiEdit2 size={20} />
                                     </button>
                                     <button onClick={() => {
                                        setConfirmationModal({
                                            text1:"Do you want to delete this course?",
                                            text2: "All the data related to this course will be deleted ",
                                            btn1Text: loading ? "loading" : "Delete",
                                            btn2Text:"Cancel",
                                            btn1Handler: () => deleteCourseHandler(course._id),
                                            btn2Handler: () => setConfirmationModal(null)
                                        })
                                     }}
                                      className='hover:scale-110 transition-all duration-200 hover:text-[#ff0000]'>
                                        <RiDeleteBin6Line size={20} />
                                     </button>
                                  </div>
                               </Td>
                            </Tr>
                        ))
                    )
                }
            </Tbody>
        </Table>

        {
            confirmationModal ? ( <ConfirmationModal modalData={confirmationModal}/>) : (<></>)
        }
    </>
  )
}

export default CourseTable