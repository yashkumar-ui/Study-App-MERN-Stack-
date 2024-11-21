import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../../../../services/operations/SettingsAPI';

const genders = ["Male" , "Female" , "Non-Binary" , "Prefer not to say" , "Others"]

const EditProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector( (state) => state.profile);
    const {token} = useSelector( (state) => state.auth);

    // use the react hook form 
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    // submit the profile form and calls the backend 
    const submitProfileForm = async (data) => {
        console.log("form -- data " , data);
        // call the backend api and save the data in the profile model
        try{
            dispatch(updateProfile(token , data))
        } catch(error){
            console.log("Error message " ,error.message);
        }
    }

  return (
    <>
        <form onSubmit={handleSubmit(submitProfileForm)}>
            {/* profile infromation */}
            <div className='my-10 flex flex-col gap-y-6 border-[1px] border-richblack-700 rounded-md p-8 bg-richblack-800 px-12'>
               <h3 className='text-lg font-[400] text-richblack-5'>Profile Information</h3>

                 {/* name change section */}
                 <div className='flex flex-col gap-2 lg:flex-row'>
                    {/* first name  */}
                    <div className='flex flex-col gap-2 lg:w-[48%] '>
                        <label htmlFor='firstName' className='lable-style'>First Name</label>
                        <input
                            type='text'
                            name='firstName'
                            id='firstName'
                            placeholder='Enter First Name'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                            defaultValue={user?.firstName}
                            {...register("firstName" , { required:true })}
                        />
                        {errors.firstName && (
                            <span className='-mt-1 text-[12px] text-yellow-100'>
                                Please enter your first name
                            </span>
                        )}
                    </div>
                    {/* last name  */}
                    <div className='flex flex-col gap-2 lg:w-[48%] '>
                        <label htmlFor='lastName' className='lable-style'>Last name </label>
                        <input
                            type='text'
                            id='lastName'
                            name='lastName'
                            placeholder='Enter your last name'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                            defaultValue={user?.lastName}
                            {...register("lastName" , {required:true})}
                        />
                        {errors.lastName && (
                            <span className='-mt-[1] text-[12px] text-yellow-100'>
                                Please enter your last name
                            </span>
                        )}
                    </div>
                 </div>

                 {/* Dob and gender section */}
                 <div className='flex flex-col gap-2 lg:flex-row'>
                    {/* dob */}
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor='dateOfBirth' className='lable-style'>Date of Birth</label>
                        <input
                            type="date"
                            id='dateOfBirth'
                            name='dateOfBirth'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                            {...register("dateOfBirth" , {
                                required: {
                                    value: true,
                                    message:"Please enter your Date of birth"
                                },
                                max:{
                                    value: new Date().toISOString().split("T")
                                }
                            })}
                            defaultValue={ user?.additionalDetails?.date}
                        />
                        {errors.dateOfBirth && (
                            <span className='-mt-1 text-[12px] text-yellow-100'>
                                {errors.dateOfBirth.message}
                            </span>
                        )}
                    </div>
                    {/* gender */}
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor='gender' className='lable-style'>Gender</label>
                        <select
                           type="text"
                           name='gender'
                           id='gender'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                            {...register("gender" , {required:true})}
                            defaultValue={user?.additionalDetails?.gender}
                        >
                          {
                            genders.map ( (ele, i) => {
                                return (
                                    <option key={i} value={ele}>
                                        {ele}
                                    </option>
                                )
                            })
                          }
                        </select>
                        {errors.gender && (
                            <span className='-mt-1 text-yellow-100 text-[12px]'>
                                Please enter your gender
                            </span>
                        )}
                    </div>
                 </div>

                 {/* Number and about section */}
                 <div className='flex flex-col gap-5 lg:flex-row'>
                    {/* number section */}
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor='contactNumber' className='lable-style'>
                            Phone number
                        </label>
                        <input
                            type='tel'
                            id='contactNumber'
                            name='contactNumber'
                            placeholder='Enter contact number'
                            style={{
                                 boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                            defaultValue={user?.additionalDetails?.contactNumber}
                            {...register("contactNumber" , {
                                required: {
                                    value:true,
                                    message:"Please enter your contact number"
                                },
                                maxLength: { value:12 , message:"Invalid Contact Number"},
                                minLength: { value:9 , message:"Invalid Contact Number"}
                            })}

                        />
                        {errors.contactNumber && (
                            <span className='-mt-1 text-[12px] text-yellow-100'>
                                {errors.contactNumber.message}
                            </span>
                        )}

                    </div>

                    {/* about */}
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                       <label htmlFor='about' className='lable-style'>
                           About
                       </label>
                       <input
                        type='text'
                        id='about'
                        name='about'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                        placeholder='Enter Bio details'
                        defaultValue={user?.additionalDetails?.about}
                        {...register("about" , {required:true})}
                       />
                       {errors.about && (
                        <span className='-mt-1 text-[12px] text-yellow-100'>
                            Please enter about yourself..
                        </span>
                       )}
                    </div>
                     
                 </div>

                 {/* save section  */}
                 <div className='flex flex-row justify-end gap-2'>
                     <button onClick={ () => navigate("/dashboard/my-profile")}  className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 hover:scale-95 duration-200 transition-all'>Cancel</button>

                     <button type='submit' className='cursor-pointer hover:scale-95 duration-200 transition-all group rounded-md py-[8px] px-[20px] font-[500] text-richblack-900 bg-yellow-50 '>Save</button>
                 </div>
            </div>
        </form>
    </>
  )
}

export default EditProfile