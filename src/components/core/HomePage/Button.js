import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children , active , linkto }) => {
  return (
    <Link to={linkto} >
        <div className= {`text-center font-medium text-[13px] px-6 py-3 rounded-md hover:scale-95 transition-all duration-200
           ${ active ? "bg-[#FFD60A] text-black" : " bg-richblack-800"}
        `}>
            {children}
        </div>
    </Link>
  )
}

export default Button