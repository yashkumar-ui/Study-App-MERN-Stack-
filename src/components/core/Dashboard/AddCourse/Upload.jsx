import React, { useEffect, useRef, useState } from 'react'
import { Player } from 'video-react'
import { FiUploadCloud } from "react-icons/fi"
import "video-react/dist/video-react.css"

import { useDropzone } from 'react-dropzone'
// import { useSelector } from 'react-redux'

const Upload = ({name , label , register , errors , setValue , videwData = null , video = false , editData = null , }) => {
   
  // const {course} = useSelector( (state) => state.course)
  const [selectedFile , setSelectedFile] = useState(null);
  const inputRef = useRef(null);
  const [previewSource , setPreviewSource] = useState(
     videwData ? videwData : editData ? editData : ""
  )
   
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if(file){
        previewFile(file)
        setSelectedFile(file)
    }
  }

  // function that read the file and preview it 
  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
        setPreviewSource(reader.result)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png" ,".heic"] }
      : { "video/*": [".mp4"] },
    onDrop,
  })

  // use the useEffect that display the change of the data 
  useEffect( () => {
    register( name , {required : true})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [register])

  useEffect( () => {
    setValue( name , selectedFile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [selectedFile , setValue])

  return (
    <div className='flex flex-col space-y-2'>
        <label className='ml-1 text-sm text-richblack-5 font-[300]'>
            {label} <sup className='text-pink-200'>*</sup>
        </label>
        <div 
            className={`${isDragActive ? "bg-richblack-600" : "bg-richblack-700"}
            flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
        >
           {previewSource ? (
            <div className='flex w-full flex-col p-6'>
                {!video ? (
                    <img src={previewSource} alt='preview' className='h-full w-full rounded-md object-cover'/>
                ) : (
                    <Player aspectRatio="16:9" playsInline src={previewSource}/>
                ) }
            </div>
            ) : (
                <div {...getRootProps()} className='flex w-full flex-col items-center p-6'>
                   <input {...getInputProps()} ref={inputRef}/>
                    <div className='grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800'>
                        <FiUploadCloud className="text-2xl text-yellow-50" />
                    </div>
                    <p className='mt-2 max-w-[200px] text-center text-sm text-richblack-200'>
                        Drag and drop an { !video ? "image" : "video"} , or click to {" "}
                        <span className='font-semibold text-yellow-50'>Browse</span> a file
                    </p>
                    <ul className='mt-10 flex list-disc justify-between space-x-12 text-sm text-richblack-200'>
                        <li>Aspect ratio 16:9</li>
                        <li>Recommended size 1024*576</li>
                    </ul>
                </div>
           )}
        </div>
        {errors[name] && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
                {label} is required
            </span>
        )}
    </div>
  )
}

export default Upload