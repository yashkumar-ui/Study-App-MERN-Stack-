import React from 'react'
import {FaArrowRight} from "react-icons/fa"
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/HomePage/ExploreMore'

const Home = () => {
  return (
    <div>
         {/* Section 1 */}
         <div className='relative mx-auto w-11/12 flex flex-col items-center max-w-maxContent text-white justify-between '>

             <Link to={"/signup"}>
                 <div className=' group mx-auto mt-16 rounded-full bg-richblack-800 font-bold text-richblack-200 p-1  transition-all duration-200 hover:scale-95 w-fit '>
                    <div className=' shadow-white shadow hover:shadow-none capitalize flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900 '>
                        <p>Become an Instructor</p>

                        {/* icons used from react icons */}
                        <FaArrowRight />
                    </div>
                 </div>

             </Link>

             <div className=' sm:text-center text-start capitalize mt-10 text-4xl font-semibold  '>
                 Empower Your future with 
                 <HighlightText text = {"Coding Skills"}/>
             </div>

             <div className='sm:text-center text-start md:w-[80%] text-[#838894] mt-4 text-lg tracking-wide'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
             </div>
             
             {/* buttons side by side */}
             <div className='flex flex-row gap-7 mt-8'>
                 <CTAButton active={true} linkto={"/signup"} >
                     Learn More
                 </CTAButton>

                 <CTAButton active={false} linkto={"/login"} >
                    Book a Demo
                 </CTAButton>

             </div>

             <div className='mx-3  my-12 shadow-lg shadow-blue-100'>
                <video muted loop autoPlay>
                    <source src={Banner} type='video/mp4' />
                </video>
             </div>

            {/* code section -1 */}

            <div className='w-full'>
                 <CodeBlocks
                    position={"lg:flex-row flex-col"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock your 
                            <HighlightText text={"coding potential"}/>
                            
                            with our online courses
                        </div>
                    }
                    subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1={
                        {
                            btnText:"Try it yourself",
                            linkto:"/signup",
                            active:true
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn More",
                            linkto:"/login",
                            active:false
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n<html>\nhead><Title>Examples</\ntitle><linkrel="stylesheet"href="styles.css"\n/head>\nbody>\nh1>a href="/">Header</a>\n/h1>\nnav><a href="One/">One</a><a/>\n<a href = "three/"</a>`}
                    codecolor={"text-yellow-25"}
                 />
            </div>

            {/* code section -2 */}
            <div className='w-full'>
                 <CodeBlocks
                    position={"lg:flex-row-reverse flex-col"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Start
                            <HighlightText text={"Coding"}/>
                            <br/>
                            <HighlightText text={"in Seconds"}/>
                        </div>
                    }
                    subheading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    ctabtn1={
                        {
                            btnText:"Continue lesson",
                            linkto:"/signup",
                            active:true
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn More",
                            linkto:"/login",
                            active:false
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n<html>\nhead><Title>Examples</\ntitle><linkrel="stylesheet"href="styles.css"\n/head>\nbody>\nh1>a href="/">Header</a>\n/h1>\nnav><a href="One/">One</a><a/>\n<a href = "three/"</a>`}
                    codecolor={"text-pink-100"}
                 />
            </div>

            <ExploreMore/>

         </div>

         {/* Section 2 */}
         <div className='bg-pure-greys-5 text-richblack-700'>

             <div className='bg-home h-[313px]'>
                 <div className='w-11/12 h-full  flex items-center gap-5 mx-auto'>
                      <div className='flex flex-row gap-8 lg:mt-[6rem]  mx-auto text-white'>
                          <CTAButton active={true} linkto={"/signup"} >
                               <div className='flex flex-row font-[500] text-sm md:text-[1rem] items-center gap-x-3'>
                                   Explore Full Catalog
                                   <FaArrowRight/>
                               </div>
                          </CTAButton>

                          <CTAButton active={false} linkto={"/signup"}>
                               <div className='font-[500] text-sm md:text-[1rem] capitalize' >
                                  Learn more
                               </div>
                          </CTAButton>


                      </div>
                 </div>

             </div>

             {/* in this div we create our full section  */}

             <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-7 '> 
                {/* part 1 */}
                <div className='flex flex-col gap-y-[2rem] lg:gap-y-0  gap-x-0 lg:flex-row lg:gap-x-4 my-[5rem] '>
                    <div className='lg:w-[50%] text-4xl font-semibold'>
                        Get the skills you need for a 
                        <HighlightText text={"Job that is in demand"}/>
                    </div>
                    
                    <div className='flex flex-col gap-8 lg:w-[40%] '>
                        <div className='text-[17px]'>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>
                        <div className='mr-auto'>
                            <CTAButton active={true} linkto={"/signup"} >
                                <div className='text-lg font-[500] capitalize'>
                                  learn more
                                </div>
                            </CTAButton>

                        </div>

                    </div>

                </div>

                {/* part - 2 */}
                <TimelineSection/>

                {/* part - 3 */}

                <LearningLanguageSection/>
                 
             </div>
         </div>

         {/* Section 3 */}

         <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 mb-[3rem] bg-black text-white '>
             
             <InstructorSection/>

             <h2 className='text-center mt-[1rem] text-4xl font-[500] capitalize tracking-[0.16em] bg-gradient-to-r from-pink-300 shadow-xl via-purple-500 to-blue-100 inline-block text-transparent bg-clip-text'>review from other Learners</h2>
  
         </div>

         {/* Footer */}
         <Footer/>
    </div>
  )
}

export default Home