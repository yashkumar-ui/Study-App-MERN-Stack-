import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp , Signup } from "../services/operations/authAPI";


const VerifyEmail = () => {
   
    
    const dispatch = useDispatch();
    const[otp , setOtp ] = useState("");
    const navigate = useNavigate();
    const { loading , signupData } = useSelector( (state) => state.auth);

    // this route is only access when the user click on the signup button , after that it could be accessed 
    useEffect( () => {
        if (!signupData){
            navigate("/signup");
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    function handleVerifyAndSignup (e){
        e.preventDefault();
        // fetch the data from the auth slice that we save in the previous part 
        const { 
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData

        // dispatch the signup api operation , 
        dispatch(Signup(
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate
        ));
    }

    return (
        <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
          {loading ? (
            <div>
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="max-w-[500px] p-4 lg:p-8">
              <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
                Verify Email
              </h1>
              <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
                A verification code has been sent to you. Enter the code below
              </p>
              <form onSubmit={handleVerifyAndSignup}>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => (
                    <input
                      {...props}
                      placeholder="-"
                      style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                    />
                  )}
                  containerStyle={{
                    justifyContent: "space-between",
                    gap: "0 6px",
                  }}
                />
                <button
                  type="submit"
                  className="w-full bg-yellow-50 py-[12px] select-none px-[12px] rounded-[8px] hover:scale-95 duration-200 transition-all mt-6 font-medium text-richblack-900"
                >
                  Verify Email
                </button>
              </form>
              <div className="mt-6 flex items-center justify-between">
                <Link to="/signup">
                  <p className="text-richblack-5 hover:scale-95 select-none transition-all duration-200 flex items-center gap-x-2">
                    <BiArrowBack /> Back To Signup
                  </p>
                </Link>
                <button
                  className="flex hover:scale-95 duration-200 transition-all select-none items-center text-blue-100 gap-x-2"
                  onClick={() => dispatch(sendOtp(signupData.email , navigate))}
                >
                  <RxCountdownTimer />
                  Resend it
                </button>
              </div>
            </div>
          )}
        </div>
      );
}

export default VerifyEmail