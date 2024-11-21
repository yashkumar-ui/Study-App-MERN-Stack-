import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { resetPassword } from '../services/operations/authAPI';



const UpdatePassword = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();  
  const location = useLocation();
  const {loading} = useSelector( (state) => state.auth)
  
  const [formData , setFormData] = useState({
     password : "",
     confirmPassword : ""
  })


  const { password , confirmPassword } = formData;

  const [showPassword , setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword ] = useState(false);

  const handleOnChange = (e) => {
    setFormData( (prevData) => ({
        ...prevData,
        [e.target.name] : e.target.value,
    }))
  }

  // submit the form and dispatch the event 

  const handleOnSubmit = (e) => {
     e.preventDefault();

     // fetch the token from the url 
     const token = location.pathname.split("/").at(-1);
     dispatch(resetPassword(password , confirmPassword , token , navigate))
  }


  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center" >
        { loading ? (<div className='spinner'></div>
        ) : (
            <div className='max-w-[500px] p-4 lg:p-8'>
                 <h1 className="text-[1.975rem] font-semibold tracking-wide  leading-[2.375rem] text-richblack-5">Choose new password</h1>
                 <p className="my-4 text-[1.1rem] font-[300] leading-[1.625rem] text-richblack-100"> Almost done. Enter your new password and youre all set.</p>
                 
                 {/* formn on submit */}
                 <form onSubmit={handleOnSubmit}>
                     <label className='relative'>
                        <p className="mb-1 pl-1 select-none font-[200] text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            New password <sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type= {showPassword ? "text" : "password" }
                            name='password'
                            value={password}
                            onChange={handleOnChange}
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            placeholder='Enter Password'
                            className='form-style w-full !pr-10 rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                        />
                        <span onClick={ () => setShowPassword( (prev) => !prev)} className='absolute z-[10] hover:scale-95 transition-all duration-200 cursor-pointer right-3 bottom-[0.03rem]' >
                            { showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />) 
                              : (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)}
                        </span>
                     </label>

                     <label className='relative mt-6 block'>
                        <p className="mb-1 pl-1 select-none font-[200] text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Confirm New Password <sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type= {showConfirmPassword ? "text" : "password" }
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleOnChange}
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}                            
                            placeholder='Enter Confirm Password'
                            className=' w-full !pr-10 rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                        />
                        <span onClick={ () => setShowConfirmPassword( (prev) => !prev)}  className='absolute z-[10] hover:scale-95 transition-all duration-200 cursor-pointer right-3 top-9' >
                            { showConfirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />) 
                              : (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)}
                        </span>
                     </label>  

                     <button type='submit' className="mt-6 tracking-wide hover:scale-95 transition-all duration-200 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900" >
                         Reset Password
                     </button>                   
                 </form>

                 <div className="mt-6 flex items-center justify-between">
                     <Link to="/login">
                        <p className="flex items-center text-sm font-[200] hover:scale-95 transition-all duration-200  gap-x-2 text-blue-100">
                        <BiArrowBack /> Back To Login
                        </p>
                     </Link>
                 </div>
            </div>
        )}
    </div>
  )
}

export default UpdatePassword