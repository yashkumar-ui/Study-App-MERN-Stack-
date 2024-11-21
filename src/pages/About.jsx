import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import FoundingStory from "../assets/Images/FoundingStory.png"
import Quote from '../components/core/AboutPage/Quote'
import Stats from '../components/core/AboutPage/Stats'
import Footer from '../components/common/Footer'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'

const About = () => {
  return (
    <div className=''>
         
         {/* section - 1  */}
         <section className='bg-richblack-800'>
             <div className='relative mx-auto w-[11/12] max-w-maxContent flex flex-col justify-between gap-10 text-center text-white '>
                 <header className='mx-auto pt-20 text-center text-4xl font-[500] tracking-wide lg:w-[70%]'>
                      Driving Innovation in Online Education for a 
                      <HighlightText text={"Brighter Future"}/>
                      <p className='mt-5 text-center tracking-normal font-[200] text-richblack-300 text-lg'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                 </header>
                 {/* <div className="sm:h-[70px] lg:h-[150px]"></div> */}
                 <div className=' px-2 md:px-4  lg:px-0  grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-y-6 mx-auto md:gap-y-0 pb-[2rem] md:pb-0 md:-mb-[7rem] z-10  gap-3 lg:gap-3'>
                     <img src={BannerImage1} alt='BannerImage 1' loading='lazy' className='hidden lg:block '/>
                     <img src={BannerImage2} alt='BannerImage 2' loading='lazy'/>
                     <img src={BannerImage3} alt='BannerImage 3' loading='lazy'/>

                 </div>
             </div>
         </section>

         {/* section - 2 --(Quote) */}
         <section className='border-b border-richblack-700'>
             <div className='mx-auto w-11/12 max-w-maxContent pb-3 flex flex-col justify-between gap-10 text-richblack-200'>
               <div className='md:h-[150px]'></div>
                <Quote/>
             </div>
         </section>

         {/* section - 3 ---(our founding story) */}
         <section>
             <div className='mx-auto w-[11/12] max-w-maxContent flex flex-col justify-between text-richblack-500'>

                 <div className="flex flex-col items-center px-2 md:px-4 gap-x-10 lg:flex-row justify-between">
                    <div className="my-24 flex lg:w-[50%] flex-col gap-10">
                         <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                            Our Founding Story
                         </h1>
                         <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                Our e-learning platform was born out of a shared vision and
                                passion for transforming education. It all began with a group of
                                educators, technologists, and lifelong learners who recognized
                                the need for accessible, flexible, and high-quality learning
                                opportunities in a rapidly evolving digital world.
                         </p>
                         <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                              As experienced educators ourselves, we witnessed firsthand the
                              limitations and challenges of traditional education systems. We
                              believed that education should not be confined to the walls of a
                              classroom or restricted by geographical boundaries. We
                              envisioned a platform that could bridge these gaps and empower
                              individuals from all walks of life to unlock their full
                              potential.
                         </p>
                 </div>

            <div>
              <img
                src={FoundingStory}
                alt=""
                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
              />
            </div>
                 </div>

                 <div className="flex flex-col items-center px-2 md:px-4 lg:gap-x-10 lg:flex-row justify-between">
                       <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                            <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                                Our Vision
                            </h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                With this vision in mind, we set out on a journey to create an
                                e-learning platform that would revolutionize the way people
                                learn. Our team of dedicated experts worked tirelessly to
                                develop a robust and intuitive platform that combines
                                cutting-edge technology with engaging content, fostering a
                                dynamic and interactive learning experience.
                            </p>
                       </div>
                       <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                            <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                                Our Mission
                            </h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                 Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                            </p>
                      </div>
                 </div>
             </div>
         </section>

         {/* section - 4 --- (Stats component) */}
         <Stats/>

         {/* section - 5 --- (learning section + contacus form ) */}
         <section className='mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white'>
             <LearningGrid/>
             <ContactFormSection/>
         </section>

         {/* section - 6 --- ( review slider ) */}

         {/* footer */}

         <Footer/>

    </div>
  )
}

export default About