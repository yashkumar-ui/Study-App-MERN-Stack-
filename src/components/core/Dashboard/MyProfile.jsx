import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RiEditBoxLine } from "react-icons/ri"
// import { formattedDate } from '../../../utilis/dataFormatter'

const MyProfile = () => {
    const {user} = useSelector( (state) => state.profile)

  return (
    <>
        <p className='text-3xl font-medium mb-14 text-richblack-5'>My Profile</p> 

        {/* image section  */}
        <div className='flex items-center justify-between bg-richblack-800 p-8 px-12 rounded-lg border-[1px] border-richblack-700'>
            <div  className='flex items-center gap-x-4'>
                    <img src={user?.image} alt={user?.firstName} className='aspect-square w-[78px] rounded-full object-cover'/>

                <div className='space-y-1'>
                    <p className='text-richblack-5 text-lg tracking-wide font-[400] leadinh-[1.3]'>
                        { user?.firstName + " " + user?.lastName}
                    </p>
                    <p className='text-sm text-richblack-300'>
                        {user?.email}
                    </p>
                </div>
            </div>

            {/* Button */}
            <Link to={"/dashboard/settings"}>
                <div className='flex flex-row items-center gap-x-2 cursor-pointer hover:scale-95 duration-200 transition-all group rounded-md py-[8px] px-[20px] font-[500] text-richblack-900 bg-yellow-50 '>  <RiEditBoxLine /> Edit</div>
            </Link>
        </div>


        {/* About section */}
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <Link to={"/dashboard/settings"}>
                <div className='flex flex-row items-center gap-x-2 cursor-pointer hover:scale-95 duration-200 transition-all group rounded-md py-[8px] px-[20px] font-[500] text-richblack-900 bg-yellow-50 '>  <RiEditBoxLine /> Edit</div>
            </Link>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-[300]`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>


        {/* Personal details section  */}
        <div className='my-10 flex flex-col gap-y-10 rounded-md bg-richblack-800 border-[1px] border-richblack-700 p-8 px-12'>

            <div className='flex flex-row items-center justify-between'>
                <p className='text-lg font-semibold text-richblack-5'>Personal Details</p>

                <Link to={"/dashboard/settings"}>
                   <div className='flex flex-row items-center gap-x-2 cursor-pointer hover:scale-95 duration-200 transition-all group rounded-md py-[8px] px-[20px] font-[500] text-richblack-900 bg-yellow-50 '>  <RiEditBoxLine /> Edit</div>
                </Link>
                
            </div>

            <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.dateOfBirth ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>


           

        </div>


    </>
  )
}

export default MyProfile