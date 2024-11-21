import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className='text-xl text-center tracking-[0.015em] py-4 md:text-4xl font-[400]  '>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text={"combines Technology"}/>
        ,{" "}
        <span>
            expertise
        </span>, and community to create an
        <span className='bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold'>
            {" "}
            unparalleled eductional experience.
        </span>
    </div>
  )
}

export default Quote