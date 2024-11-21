import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utilis/avgRating';
import ReactMarkdown  from "react-markdown"
import RatingStars from '../components/common/RatingStars';
import { BuyCourse } from '../services/operations/studentsFeaturesAPI';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { logout } from '../services/operations/authAPI';
import CourseAccordionBar from '../components/core/Courses /CourseAccordionBar';
import Footer from '../components/common/Footer';
import CourseDetailsCard from '../components/core/Courses /CourseDetailsCard';
import Error from './Error';

const CourseDetails = () => {
    const {courseId} = useParams();
    const {token} = useSelector( (state) => state.auth);
    const {payementLoading} = useSelector( (state) => state.course);
    const {user} = useSelector( (state) => state.profile);
    // const {loading} = useSelector ( (state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal , setConfirmationModal] = useState(null);

    // declare a state to store the course details 
    const [response , setResponse] = useState(null);
    
    // get the course details at the first render 
    useEffect( () => {
        const courseData = async () => {
            
            const res = await fetchCourseDetails(courseId);
            // console.log(res);
            // console.log("Response WHat you will learn ---->", res.courseDetails[0].instructor.firstName)
            setResponse(res);
            // console.log(response.courseDetails[0].ratingAndReviews);
            // console.log("sher--->",response?.courseDetails[0]?.instructor?.firstName)
        }

        courseData();
    }, [courseId]);

    // calulate the avg rating 
   const [avgReviewCount , setAvgReviewCount] = useState(0);
    useEffect( () => {
        const count = GetAvgRating(response?.courseDetails[0]?.ratingAndReviews)
        setAvgReviewCount(count);
        // console.log("Avg review count ---> ", avgReviewCount )

    }, [response]);

    // check the is active state 
    const [isActive, setIsActive] = useState(Array(0))
    const handleActive = (id) => {
      // console.log("called", id)
      setIsActive(
        !isActive.includes(id)
          ? isActive.concat([id])
          : isActive.filter((e) => e !== id)
      )
    }

    // handle the total no of lecture 
    const [totalNoOfLectures , setTotalNoOfLectures] = useState(0);
    useEffect( () => {
        let lectures = 0;
        response?.data?.courseDetails?.courseContent?.forEach( (sec) => {
            lectures += sec.subSection.length || 0
        })
        setTotalNoOfLectures(lectures);
    }, [response]);


    if (!response){
        return(
            <div className='grid min-h-[calc(100vh-3.5rem] place-items-center'>
                <div className='spinner'></div>
            </div>
        )
    }
     
    // console.log("token ---> ", user.accountType);
    // Buy the course 
    const handleBuyCourse = () => {
        if(token) {
            // check if the user is Instructor or not 
            if(user.accountType === "Instructor"){
                /// show the modal 
                setConfirmationModal({
                    text1: "Your are login with Instrutor Account",
                    text2:"Please Login in with Student Account ",
                    btn1Text:"Logout",
                    btn2Text:"Cancel",
                    btn1Handler: () => dispatch(logout(navigate)) ,
                    btn2Handler: () => setConfirmationModal(null),
                })
                return;
            }

            // call the function Buy course direcly 
            BuyCourse(token , [courseId] , user , navigate , dispatch);
            return;
            // console.log("sherr");
        } 

        setConfirmationModal({
            text1: "Your are not Logged in!",
            text2: "Please login to Purchase Course.",
            btn1Text : "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })


    }

  return (
    <>
        {/* main section */}
        <div className={`relative w-full bg-richblack-800`}>
           <div className='mx-auto flex  box-content px-4 lg:max-w-maxContent 2xl:relative' > 
               <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
                   {/* create this later */}
                   <div className='relative block max-h-[30rem] lg:hidden'>
                      <div>
                          <img alt='Course thumbnail' className='aspect-auto w-full'
                            src={response?.courseDetails[0]?.thumbnail}
                          />
                      </div>
                   </div>

                   <div className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}>
                       <p className='text-4xl sm:text-[42px] font-bold text-richblack-5'>{response?.courseDetails[0]?.courseName}</p>

                       <p className='font-light tracking-wide text-richblack-200'>{response?.courseDetails[0]?.courseDescription}</p>
                       <div className='flex text-lg flex-wrap items-center gap-2'>
                         <span className='text-yellow-50'>{`${avgReviewCount}`}</span>
                         <RatingStars Review_Count={avgReviewCount} />
                         <span className='text-richblack-300'>{ `${response?.courseDetails[0]?.ratingAndReviews?.length} reviews`}</span>
                         <span className='text-richblack-300'>{`${response?.courseDetails[0]?.studentsEnrolled?.length} students enrolled`}</span>
                        
                       </div>
                       <div>
                         <p className='font-light tracking-wide' >
                            Created by {`${response?.courseDetails[0]?.instructor?.firstName}  ${response?.courseDetails[0]?.instructor?.lastName}` }
                         </p>
                       </div>
                   </div>

                   <div className='flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden'>
                      <p className='space-x-3 pb-4 text-3xl font-semibold text-richblack-5'>
                         Rs. {response?.courseDetails[0]?.price}
                      </p>
                      <button onClick={ user && response?.courseDetails[0]?.studentsEnrolled.includes(user._id) ? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse}  className='px-10 py-4 bg-yellow-50 font-semibold text-sm rounded-md'>
                          { user && response?.courseDetails[0]?.studentsEnrolled.includes(user._id) ? "Go to Course" : "Buy Course"}
                      </button>
                      { (!user || !response?.courseDetails[0]?.studentsEnrolled.includes(user._id)) && (
                         <button className='px-7 py-3 bg-richblack-500 rounded-md text-richblack-5 text-sm font-[600] hover:scale-95 duration-200 transition-all'>Add to Cart</button>
                      )}

                   </div>

               </div>

               {/* Course Buy Card */}
               <div className='right-[1rem] top-[60px] hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block'> 
                  <CourseDetailsCard
                    course = {response?.courseDetails[0]}
                    thumbnail = {response?.courseDetails[0]?.thumbnail}
                    setConfirmationModal={setConfirmationModal}
                    handleBuyCourse = {handleBuyCourse}
                  />
               </div>
           </div>
        </div>
        {/* what you will learn section + all sections */}
        <div className='mx-auto my-5 box-content px-4 text-start text-richblack-5 lg:w-[1260px]'>
            <div className='mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]'>

                  {/* What you will learn section  */}
                  <div className='my-8 border border-richblack-600 p-8'>
                     <p className='text-3xl text-richblack-5 font-[400]'>What you'll learn</p>
                     <div className='mt-5'>
                        <ReactMarkdown>{response?.courseDetails[0]?.whatYouWillLearn}</ReactMarkdown>
                     </div>
                  </div>

                  {/* Course Content Section  */}
                  <div className='max-w-[830px]'>
                       <div className="flex flex-col gap-3">
                            <p className="text-[28px] font-semibold">Course Content</p>
                            <div className="flex flex-wrap justify-between gap-2">
                                <div className="flex gap-2">
                                       <span>
                                           {response?.courseDetails[0]?.courseContent?.length} {`section(s)`}
                                       </span>
                                       <span>
                                            {totalNoOfLectures} {`lecture(s)`}
                                       </span>
                                       <span>{response?.totalDuration} total length</span>
                                 </div>

                                 <div>
                                      <button
                                           className="text-yellow-25"
                                            onClick={() => setIsActive([])}
                                       >
                                           Collapse all sections
                                      </button>
                                  </div>
                            </div>
                       </div>

                       {/* Course Detials Accordition  */}
                       <div className='py-4'>
                          {
                            response?.courseDetails[0].courseContent.map( (ese , index) => (
                                // render the component 
                                <CourseAccordionBar
                                 course = {ese}
                                 key={index}
                                 isActive={isActive}
                                 handleActive = {handleActive} />
                            ) )
                          }
                       </div>

                       {/* Author Details Section */}
                       <div className="mb-12 py-4">
                            <p className="text-[28px] font-semibold">Author</p>
                            <div className="flex items-center gap-4 py-4">
                                 <img
                                     src={
                                          response?.courseDetails[0]?.instructor?.image
                                     }
                                    alt="Author"
                                     className="h-14 w-14 rounded-full object-cover"
                                  />
                                  <p className="text-lg">{`${response?.courseDetails[0]?.instructor?.firstName} ${response?.courseDetails[0]?.instructor?.lastName}`}</p>
                            </div>
                             <p className="text-richblack-50">
                                    {response?.courseDetails[0]?.instructor?.additionalDetails?.about}
                             </p>
                       </div>
                  </div>


                  {/* Review Slider of the student */}
                  {/* Pending state , we willl make this later */}

            </div>
        </div>

        {/* Footer  */}
        <Footer/>

        {/* Modal --> confirmation */}
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </>
  )

}

export default CourseDetails