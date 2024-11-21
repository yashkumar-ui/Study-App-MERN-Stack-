import React from 'react'
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
    {
      icon: "HiChatBubbleLeftRight",
      heading: "Chat on us",
      description: "Our friendly team is here to help.",
      details: "info@studynotion.com",
    },
    {
      icon: "BiWorld",
      heading: "Visit us",
      description: "Come and say hello at our office HQ.",
      details:
        "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    },
    {
      icon: "IoCall",
      heading: "Call us",
      description: "Mon - Fri From 8am to 5pm",
      details: "+123 456 7869",
    },
  ]

const ContactPageDetails = () => {

  return (
    <div className=' flex flex-col bg-richblack-800 p-4 gap-y-6 lg:p-6 rounded-xl'>
       {
        contactDetails.map( (exe , i) => {
             let Icon = Icon1[exe.icon] || Icon2[exe.icon] || Icon3[exe.icon]
            return(
                <div key={i} className='flex flex-col '>
                    <div className='flex flex-row gap-x-2  items-center'>
                        <Icon size={25}/>
                        <h3 className='font-semibold tracking-wide text-richblack-5 text-lg'>{exe.heading}</h3>
                    </div>
                    <p className='font-[400] text-sm pl-8 text-richblack-300'>{exe.description}</p>
                    <p className='font-[400] text-sm pl-8 text-richblack-300'>{exe.details}</p>
                </div>
            )
        })
       }
    </div>
  )
}

export default ContactPageDetails