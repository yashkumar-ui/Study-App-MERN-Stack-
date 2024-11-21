import React, { useState } from 'react'
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';

const ForgotPassword = () => {
    const [email , setEmail] = useState("");
    const [emailSent , setEmailSent] = useState(false);
    const {loading} = useSelector( (state) => state.auth)
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email , setEmailSent))
    }
    
  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
        { loading ? (<div className='spinner'></div>
        ) : (
           <div className='max-w-[500px] p-4 lg:p-8'>
               <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
                 { !emailSent ? "Reset your Password" : "Check email"}
               </h1>

               <p className='my-4 text-[1rem] font-[200] leading-[1.425rem] text-richblack-100'>
                  { !emailSent ? 
                     " Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" :
                     `we have sent the reset link to ${email}`
                  }
               </p>

               {/* form --> submit type  */}
               <form onSubmit={handleOnSubmit}>
                   {/* if the emailm is not sent then we show the input field only  */}
                   {!emailSent && (
                      <label className="w-full">
                         <p className="mb-1 pl-1 select-none font-[200] text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Email Address <sup className="text-pink-200">*</sup>
                         </p>
                         <input
                           required
                           type="email"
                           name="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                           }}                           
                           placeholder="Enter email address"
                           className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                          />
                      </label>
                    )}
                   <button type="submit" className='mt-[2.5rem] w-full  hover:scale-95 transition-all duration-200 rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"'>
                        { !emailSent ? "Reset Password" : "Resend Email"}
                   </button> 

               </form>

               <div className='mt-6 flex items-center justify-between'>
                  <Link to= "/login">
                     <p className='flex items-center text-sm text-blue-100  font-[200]  gap-x-2 hover:scale-95 duration-200 transition-all'>
                       <BiArrowBack />
                        Back to login
                     </p>
                  </Link>
               </div>
           </div>
        )}
    </div>
  )
}

export default ForgotPassword