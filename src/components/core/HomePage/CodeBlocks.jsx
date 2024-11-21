import React from 'react'
import CTAButton from "./Button"
import HighlightText from './HighlightText'
import {FaArrowRight} from "react-icons/fa"
import { TypeAnimation } from 'react-type-animation'


const CodeBlocks = ({
    position , heading , subheading , ctabtn1 , ctabtn2 , codeblock , gradient , codecolor
}) => {
  return (
    <div className= {`flex ${position} w-full select-none lg:gap-x-[2rem] gap-y-[2.6rem] lg:gap-y-0 my-20 justify-around `}>
         {/* requirements  the resulable componebts  */}

         {/* Section - 1 */}
         <div className='lg:w-[40%] w-[100%] flex flex-col gap-8 '>
             {heading}

             <div className='text-richblack-300 font-bold'>
                {subheading}
             </div>

             <div className='flex gap-7 mt-7'>
                 <CTAButton linkto={ctabtn1.linkto} active={ctabtn1.active} >
                    <div className='flex flex-row items-center gap-x-3'>
                        {ctabtn1.btnText}
                        <FaArrowRight/>
                    </div>
                 </CTAButton>

                 <CTAButton linkto={ctabtn2.linkto} active={ctabtn2.active} >
                      {ctabtn2.btnText}
                 </CTAButton>
             </div>
         </div>

         {/* Section - 2  */}
         <div className='flex h-fit lg:w-[500px] w-[100%]  gap-x-4 flex-row codeBlocks rounded-sm p-4 '>
             <div className='flex left-0 flex-col text-center font-inter font-bold text-richblack-200 w-[10%]'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
             </div>

             <div className={`w-[90%] left-0 flex-1 flex flex-col gap-2 leading-[1.4] font-bold font-mono ${codecolor} pr-2`}>
                <TypeAnimation
                    sequence={[codeblock, 2000, ""]}
                    repeat={Infinity}
                    cursor={true}
           
                    style = {
                       {
                           whiteSpace: "pre-line",
                           display:"block",
                           height:"100%",
                           left:"0",
                           minWidth:"100%"

                       }
                    }
                    omitDeletionAnimation={true}
                    />
             </div>

         </div>

    </div>
  )
}

export default CodeBlocks