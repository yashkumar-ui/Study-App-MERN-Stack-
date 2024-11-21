import React from 'react'
import HighlightText from './HighlightText'
import { FaArrowRight } from 'react-icons/fa'
import CTAButton from "./Button"
import instructor from "../../../assets/Images/Instructor.png"

const InstructorSection = () => {
  return (
    <div className='my-16 flex items-center flex-col gap-y-[5rem] lg:gap-y-0 lg:flex-row gap-x-0 lg:gap-x-[2rem] '>
       {/* part - 1 */}
       <div className='lg:w-[50%]'>
           <img src={instructor} alt='instructor' className='shadow-blue-100 shadow-xl' />
       </div>

       {/* part - 2 */}
       <div className='lg:w-[40%] flex flex-col ml-auto justify-center gap-y-6'>
          <div className='text-4xl  font-semibold'>
              Become an <br/>
              <HighlightText text={"Instructor"}/>
          </div>

          <p className='font-[300] mb-[2rem] text-[18px] text-richblack-300'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>

          <div className='mr-auto'>
            <CTAButton active={true} linkto={"/signup"}>
                <div className='flex flex-row gap-x-3  tracking-wide  font-semibold items-center '>
                    Start Learning Today
                    <FaArrowRight/>
                </div>
            </CTAButton>
          </div>
       </div>

        

    </div>
  )
}

export default InstructorSection