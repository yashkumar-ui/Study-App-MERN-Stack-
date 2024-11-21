import React from 'react'
import CTAButton from "./Button"
import Know_your_Progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"

const LearningLanguageSection = () => {
  return (
    <div className='mt-[3rem] mb-[3rem]'>
       <div className='flex flex-col gap-y-5 items-center'>
            <div className='text-4xl text-center font-bold'>
                Your swiss knife for <span className='bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 inline-block text-transparent bg-clip-text'> learning any language</span>
            </div>

            <p className='text-center w-full lg:w-[70%] text-richblack-600 mx-auto font-[500] text-xl'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </p>

            {/* image part  */}
            <div className='flex flex-col lg:flex-row items-center justify-center mt-5'>
                 <img src={Know_your_Progress} alt='knowProgress' className='object-contain  lg:-mr-32' />
                 <img src={compare_with_others} alt='Comparewithothers' className='object-contain -mt-20 lg:mt-0' />
                 <img src={plan_your_lessons} alt='Planyourlessons' className='object-contain  -mt-20 lg:mt-0 lg:-ml-36 '/>
            </div>

            <div className='w-ft mx-auto '>
                <CTAButton active={true} linkto={"/signup"}>
                     <div className='font-semibold capitalize'>
                        Learn more
                     </div>
                </CTAButton>
            </div>


       </div>
    </div>
  )
}

export default LearningLanguageSection