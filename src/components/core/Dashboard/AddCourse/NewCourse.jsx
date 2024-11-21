import React from 'react'
import RenderSteps from './RenderSteps'
import { Link } from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa";

const uploadTips = [
    {
        title: 'Set the Course Price option or make it free.'
    },
    {
        title: 'Standard size for the course thumbnail is 1024x576.'
    },
    {
        title: 'Video section controls the course overview video.'
    },
    {
        title: 'Course Builder is where you create & organize a course.'
    },
    {
        title: 'Add Topics in the Course Builder section to create lessons, quizzes, and assignments.'
    },
    {
        title:'Information from the Additional Data section shows up on the course single page.'
    },
    {
        title: 'Make Announcements to notify any important'
    },
    {
        title:"Notes to all enrolled students at once."
    }
]

const NewCourse = () => {
  return (
    <div className='flex w-full items-start gap-x-6'>
         <div className='flex flex-1 flex-col'>
             <p className='text-3xl text-richblack-5 text-semibold mb-2 '>Add Course</p>
              <Link to={"/dashboard/my-profile"}>
                  <p className='mb-14 text-sm text-richblack-400 flex items-center gap-1 '> <FaChevronLeft size={12} /> Back to dashboard</p>
              </Link>
             <div className='flex-1'>
                <RenderSteps/>
             </div>
         </div>

         {/* Course upload tips  */}
         <div className='sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block'>
            <p className='text-richblack-5 mb-8 text-lg tracking-wider'>⚡ Course Upload Tips</p>
            <ul className='ml-5 list-item list-disc space-y-4 text-xs text-richblack-5'>
                 {
                    uploadTips.map( (exe , index ) => (
                        <li key={index}>{exe.title}</li>
                    ) )
                 }
            </ul>

         </div>

    </div>
  )
}

export default NewCourse