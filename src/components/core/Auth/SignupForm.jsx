import React from 'react'
import { useState } from 'react'
import Tab from '../../common/Tab'
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ACCOUNT_TYPE } from '../../../utilis/constants'
import { sendOtp } from '../../../services/operations/authAPI'
import { setSignupData } from '../../../slices/authSlice'


const SignupForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

     // student or instructor
   const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

    const [formData , setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""

    })
    const[ showPassword , setShowPassword] = useState(false);
    const [ showConfirmPassword , setShowConfirmPassword] = useState(false);

    const { firstName , lastName , email , password , confirmPassword } = formData;
    
    // handle on change in the input fields 
    const handleOnChange = (e) => {
        setFormData( (prevData) => ({
            ...prevData,
            [e.target.name] : e.target.value,
        }) )
    }

    // handle on submit form data 
    const handleOnSubmit = (e) => {
        e.preventDefault();

        // check if the password are same or not 
        if( password !== confirmPassword){
            toast.error("Password doesn't match")
            return;
        }

        // add the accountType in the form data
        const signupData = {
            ...formData,
            accountType,
        }

        // the data to be used after the otp verification
        dispatch(setSignupData(signupData));

        // send the otp to the user 
        dispatch(sendOtp(formData.email , navigate))

        // reste the form data 
        setFormData({
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:"",
        })
        setAccountType(ACCOUNT_TYPE.STUDENT)
    }

     // data to pass to Tab component
    const tabData = [
         {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
         },
         {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,
         },
    ]

    return (
        <div>
          {/* Tab */}
          <Tab tabData={tabData} field={accountType} setField={setAccountType} />
          {/* Form */}
          <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
            <div className="flex gap-x-4">
              <label>
                <p className="mb-1 text-[0.875rem] select-none font-[200] pl-1 leading-[1.375rem] text-richblack-5">
                  First Name <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={handleOnChange}
                  placeholder="Enter first name"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full hover:scale-95 duration-200 transition-all rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
              </label>
              <label>
                <p className="mb-1 text-[0.875rem] select-none font-[200] pl-1 leading-[1.375rem] text-richblack-5">
                  Last Name <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleOnChange}
                  placeholder="Enter last name"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 hover:scale-95 transition-all duration-200"
                />
              </label>
            </div>
            <label className="w-full">
              <p className="mb-1 font-[200] select-none pl-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Email Address <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="text"
                name="email"
                value={email}
                onChange={handleOnChange}
                placeholder="Enter email address"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] hover:scale-95 duration-200 transition-all text-richblack-5"
              />
            </label>
            <div className="flex gap-x-4">
              <label className="relative">
                <p className="mb-1 font-[200] select-none pl-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Create Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter Password"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10  text-richblack-5"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer hover:scale-95 transition-all duration-200"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </label>
              <label className="relative">
                <p className="mb-1 text-[0.875rem] font-[200] pl-1 select-none leading-[1.375rem] text-richblack-5">
                  Confirm Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Confirm Password"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer hover:scale-95 duration-200 transition-all"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] hover:scale-95 transition-all duration-200 font-medium text-richblack-900"
            >
              Create Account
            </button>
          </form>
        </div>
      )
}

export default SignupForm