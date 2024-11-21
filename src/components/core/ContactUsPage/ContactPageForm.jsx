import React from 'react'
import ContactForm from './ContactForm'

const ContactPageForm = () => {
  return (
    <div className='flex flex-col  border border-richblack-600 gap-3 rounded-xl p-7 lg:p-14'>
        <h1 className='md:text-4xl text-2xl font-semibold '>Got a Idea? We’ve got the skills Let’s team up</h1>
        <p className='text-sm text-richblack-300'>Tell us more about yourself and what you’re got in mind.</p>
        <div className='mt-7 '>
            <ContactForm/>
        </div>
    </div>
  )
}

export default ContactPageForm