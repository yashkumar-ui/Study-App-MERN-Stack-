import React, { useState , useEffect } from 'react'
import { useForm } from 'react-hook-form'
import countrycode from '../../../data/countrycode.json'
import { apiConnector } from '../../../services/apiconnector';
import { contactUsEndpoints } from '../../../services/apis';
import toast from 'react-hot-toast';

const ContactForm = () => {

    const[loading , setLoading ] = useState(false);

    // import the form required thing from the react - hook - form package
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors , isSubmitSuccessful}
    } = useForm();

    // submit the form and send the email
    const submitContactForm = async (data) => {
        // console.log("Form Data - ", data)
        try {
          setLoading(true)
          // calls the backend and send the mail
          const response = await apiConnector("POST" , contactUsEndpoints.CONTACTUS_API , data );
          
          setLoading(false)
          toast.success("form submit successfully")
        } catch (error) {
          console.log("ERROR MESSAGE - ", error.message)
          setLoading(false)
          toast.error("error while submit the form ")
        }
      }

    useEffect(() => {
        if (isSubmitSuccessful) {
          reset({
            email: "",
            firstname: "",
            lastname: "",
            message: "",
            phoneNo: "",
          })
        }
      }, [reset, isSubmitSuccessful])

  return (
    <div className=''>{ loading ? (<div className='spinner flex items-center justify-center'></div>) :
     (<form className="flex flex-col gap-7" onSubmit={handleSubmit(submitContactForm)}>
       {/* first name and the last name */}
       <div className="flex flex-col gap-5 lg:flex-row">
           {/* first name  */}
           <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstname" className="lable-style">
                  First Name
              </label>
              <input
                name='firstname'
                id='firstname'
                placeholder='Enter first name'
                style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                {...register("firstname" , { required:true})}
              />
              {errors.firstname && (
                <span className='-mt-1 text-[12px] text-yellow-100'>
                    Please enter your name
                </span>
              )}
              
           </div>

           {/* last name  */}
           <div className="flex flex-col gap-2 lg:w-[48%]">
               <label htmlFor='lastname' className='lable-style'>
                  Last Name
               </label>
               <input
                  id='lastname'
                  name='lastname'
                  placeholder='Enter last name'
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                  {...register("lastname")}
               />
           </div>
       </div>

       {/* email */}
       <div className='flex flex-col gap-2'>
          <label htmlFor='email' className='lable-style'>
             Email Address
          </label>
          <input
            id='email'
            name='email'
            placeholder="Enter email address..."
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            {...register("email" , {required:true})}
          />
          {errors.email && <span className='-mt-1 text-yellow-200 text-[12px]'>
            Enter your email
          </span>}
       </div>

       {/* phone number */}
       <div className='flex flex-col gap-2'>
         <label htmlFor='phonenumber' className='lable-style'>
            Phone Number
         </label>
         <div className='flex flex-row gap-5'>
            {/* select the country code */}
            <div className="flex w-[81px] flex-col gap-2">
               <select
                  type="text"
                  name='countrycode'
                  style={{
                     boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" 
                  {...register("countrycode" , {required:true})}
                  >
                  {
                    countrycode.map( (exe, i) => {
                        return(
                            <option key={i} value={exe.code} >
                                {exe.code} -{exe.country}
                            </option>
                        )
                    })
                  }
               </select>
            </div>
            
            {/* enter your phone number */}
            <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                <input
                    type='number'
                    name='phonenumber'
                    placeholder='12345 67890'
                    style={{
                     boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" 
                    {...register("phoneNo" , {
                        required:{
                            value:true,
                            message:"Please enter your number"
                        },
                        maxLength:{ value:12 , message:"Invalid Phone number"},
                        minLength:{value:9 , message:"Invalid Phone number"}
                    })}
                />
            </div>
             
         </div>

         {/* errors */}
         {errors.phoneNo && (
            <span className='-mt-1  text-yellow-200 text-[12px]'>
                Enter your phone number
            </span>
         )}

       </div>

       {/* message */}
       <div className='flex flex-col gap-2'>
          <label htmlFor='message' className='lable-style'>
            Message
          </label>
          <textarea
            id='message'
            name='message'
            cols="30"
            rows="7"
            placeholder='Enter your message here...'
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            {...register( "message" , {required:true})}

          />
          {errors.message && (
            <span className='text-[12px] text-yellow-200 -mt-1'>
                please enter your message here
            </span>
          )}
       </div>

       {/* button for submit the form  */}
       <button type='submit'  disabled={loading}
         className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-[400] text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
            ${
               !loading &&
               "transition-all duration-200 hover:scale-95 hover:shadow-none"
            }  disabled:bg-richblack-500 sm:text-[16px] `}
       >
          Send Message
       </button>

          </form>)} 

    </div>

  )
}

export default ContactForm