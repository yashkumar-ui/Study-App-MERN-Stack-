import React from 'react'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelingImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        logo: logo1 ,
        heading: "Leadership" ,
        description: "Full commited to the success company" ,
    },
    {
        logo: logo2 ,
        heading: "Responsibility" ,
        description: "Students will always be our first priority" ,
    },
    {
        logo: logo3 ,
        heading: "Flexibility" ,
        description: "The ability to switch is an important skills" ,
    },
    {
        logo: logo4 ,
        heading: "Solve the problem" ,
        description: "Code your way to solution" ,
    },
];

const TimelineSection = () => {
  return (
    <div>
        <div className='flex select-none flex-col gap-y-[3rem] lg:gap-y-0 lg:flex-row gap-x-0 lg:gap-x-3 mb-[3rem]'>
             {/* left part */}
             <div className='lg:w-[45%]  flex flex-col justify-around gap-y-[1.25rem]'>
                {
                    timeline.map( (element , index ) => {
                        return(
                            <div className='flex flex-row  gap-x-[1.5rem]' key={index} >
                                {/* left - part */}
                                <div className='w-[60px] drop-shadow-xl rounded-full h-[60px] bg-white  flex justify-center items-center'>
                                    <img alt='logo'   src={element.logo}/>
                                </div>
                                {/* right - part */}
                                <div className=' flex flex-col gap-y-1 justify-center'>
                                    <h2 className='font-bold tracking-[0.07em] underline text-xl'>{element.heading}</h2>
                                    <p className='text-base tracking-widest text-pure-greys-500'>{element.description}</p>
                                </div>

                            </div>
                        )
                    } )
                }

             </div>

             {/* right part */}
             <div className='relative shadow-blue-200'>
                 <img src={timelingImage}
                    alt='timelineImage'
                    className='shadow-white select-none object-cover h-fit'
                 />

                 <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-2 sm:py-4 md:py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                      <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                           <p className='md:text-3xl text-lg font-bold'>10</p>
                           <p className='text-caribbeangreen-300 uppercase text-xs  md:text-sm'>Years of Experience</p>
                      </div>

                      <div className='flex gap-5 items-center px-7'>
                          <p className='md:text-3xl text-lg font-bold'>250</p>
                          <p className='text-caribbeangreen-300 uppercase text-xs md:text-sm'>Type of Courses</p>
                     </div>

                 </div> 

             </div>
        </div>
    </div>
  )
}

export default TimelineSection