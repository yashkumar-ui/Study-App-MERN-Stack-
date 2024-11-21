import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import copy from "copy-to-clipboard";
import {toast} from "react-hot-toast";
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { ACCOUNT_TYPE } from '../../../utilis/constants';
import { logout } from '../../../services/operations/authAPI';
import { addToCart } from '../../../slices/cartSlice';


const CourseDetailsCard = ({course, setConfirmationModal , thumbnail , handleBuyCourse}) => {
    const {user} = useSelector( (state) => state.profile)
    const {token} = useSelector( (state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // console.log("hred-->" , window.location.href)

    const handleShare = () => {
       copy(window.location.href)
       toast.success("Link Copy to clipboard")
    }

    // add to cart Function implementation
    const handleAddToCart = () => {

        if(token){
            // check if the account is instructor or not 
            if( user.accountType === ACCOUNT_TYPE.INSTRUCTOR ){
                // show the modal 
                setConfirmationModal({
                    text1:"You are login with Instructor Account",
                    text2:"Please Login with Student Account",
                    btn1Text:"Logout",
                    btn2Text:"Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () =>  setConfirmationModal(null),
                })
                return;
            }
            // dispacth the function add to Cart --> 
            dispatch(addToCart(course));
            return;

        }

        // show confirmation modal 
        setConfirmationModal({
            text1:"You are not logged in !",
            text2:"Please login to add To Cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }


  return (
    <>
      <div className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}>
          {/* Course Image  */}
          <img
            src={course?.thumbnail}
            alt={course?.courseName}
            className='max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full'
          />

          <div className='px-4'>
             <div className='space-x-3 pb-4 font-semibold text-3xl'>
                 Rs. {course?.price}
             </div>
             <div className='flex flex-col gap-4'>
                <button onClick={ user && course?.studentsEnrolled.includes(user._id) ? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse}
                  className='px-7 py-3 bg-yellow-50 rounded-md text-richblack-800 text-lg font-semibold hover:scale-95 duration-200 transition-all'>
                    { user && course?.studentsEnrolled.includes(user._id) ? "Go to course" : " Buy Course"}
                </button>
                {/* show add to cart only if the user is not buy that course */}
                { (!user || !course?.studentsEnrolled.includes(user._id)) && (
                    <button onClick={handleAddToCart} className='px-7 py-3 bg-richblack-800 rounded-md text-richblack-5 text-lg font-[400] hover:scale-95 duration-200 transition-all'>Add to Cart</button>
                )}
             </div>
             <div>
                <p className='pb-3 pt-6 text-center text-sm text-richblack-25 select-none'>
                    30-Day Money-Back Guarantee
                </p>
             </div>

             <div>
                <p className='my-2 tracking-wide text-semibold text-lg'>
                    This Course Includes : 
                </p>
                 {/* insrtuctions of the course --> */}
                <div className='flex flex-col gap-3 text-sm text-caribbeangreen-100'>
                    { course?.instructions?.map( (item , i) => {
                        return(
                            <p key={i} className='flex items-center gap-x-2'>
                                <BsFillCaretRightFill />
                                <span>{item}</span>
                            </p>
                        )
                    })}
                </div>
             </div>

             <div className='text-center'>
                <button onClick={handleShare} className='text-yellow-50 flex gap-x-2 items-center mx-auto hover:scale-110 duration-200 transition-all hover:text-pink-200 py-6 text-lg'>
                  <FaShareSquare size={15}/>
                   Share
                </button>
             </div>

          </div>
      </div>
    </>
  )
}

export default CourseDetailsCard