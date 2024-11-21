import React from 'react'
import ChangeProfilePicture from './Settings/ChangeProfilePicture'
import EditProfile from './Settings/EditProfile'
import DeleteAccount from './Settings/DeleteAccount'

const Setting = () => {
  return (
    <>
        <h1 className='text-3xl mb-4 font-medium text-richblack-5'> Edit Profile</h1>
        {/* Change profile Picture */}
         <ChangeProfilePicture/>
        {/* Edit profile Section */}
          <EditProfile/>
        {/* Delete Account Section */}
         <DeleteAccount/>

    </>
  )
}

export default Setting