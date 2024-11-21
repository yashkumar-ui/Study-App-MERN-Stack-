import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiUpload } from "react-icons/fi"
import { updateDisplayPicture } from '../../../../services/operations/SettingsAPI';

const ChangeProfilePicture = () => {
    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const dispatch = useDispatch();

    const [loading , setLoading] = useState(false);
    const [imageFile , setImageFile] = useState(null);
    const [previewSource , setPreviewSource] = useState(null);

    const fileInputRef = useRef(null);

    // on click on the button 
    const handleClick = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        
        console.log(file)

        if(file) {
            setImageFile(file)
            previewFile(file)
        }
    }

    // function that read the image file 
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    // upload the file to the user id 
    const handleFileUpload = () => {
        try{
            setLoading(true)
            const formData = new FormData()
            formData.append("displayPicture", imageFile)
            console.log("form data ->" , formData);

            // call the backend and and upload the image 
            dispatch(updateDisplayPicture(token , formData)).then( () => 
            setLoading(false))


        } catch(error){
            console.log("error message -->" , error.message);
        }
    }

    useEffect(  () => {
        if(imageFile) {
            previewFile(imageFile);
        }
    } , [imageFile])


  return (
    <>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
         <div className='flex items-center gap-x-5'>
             {/* Image - part 1 */}
             <img src={ previewSource || user?.image}
                 alt={`profile-${user?.firstName}`}
                 className="aspect-square w-[78px] rounded-full object-cover"
             />
             {/* change image section  */}
             <div className='space-y-2'>
                <p className='text-richblack-5 font-[300]'>Change Profile Picture</p>
                <div className='flex flex-row gap-3'>
                    {/* input field  */}
                    <input
                        type='file'
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className='hidden'
                        accept="image/png, image/gif, image/jpeg"
                    />
                    <button onClick={handleClick} disabled={loading} className='cursor-pointer hover:scale-95 transition-all duration-200 rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-5 '>
                        Select
                    </button>

                    <button onClick={handleFileUpload} className='flex flex-row items-center gap-x-2 cursor-pointer hover:scale-95 duration-200 transition-all group rounded-md py-[8px] px-[20px] font-[500] text-richblack-900 bg-yellow-50 '>
                         {loading ? "Uploading..." : "Upload"}
                         {!loading && (
                             <FiUpload className="text-lg text-richblack-900" />
                          )}
                    </button>


                </div>
             </div>
         </div>

      </div>
    </>
  )
}

export default ChangeProfilePicture