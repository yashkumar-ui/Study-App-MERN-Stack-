import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className='flex min-h-[calc(100vh-3.5rem)] select-none flex-col gap-y-6 justify-center items-center text-yellow-100 text-xl lg:text-4xl'>
        Error - 404 Not found  
        <button onClick={ () => navigate("/")} className='lg:text-lg  text-sm px-6 py-3 hover:scale-95 transition-all duration-200 bg-yellow-100 rounded-md text-richblack-900'>Go to Homepage</button>
    </div>
  )
}

export default Error