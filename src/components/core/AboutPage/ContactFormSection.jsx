import React from 'react'
import ContactForm from '../ContactUsPage/ContactForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto'>
        <h1 className='text-4xl text-center font-[600]'>Get in Touch</h1>
        <p className='text-richblack-300 mt-3 text-center font-[400] tracking-wide'> We&apos;d love to here for you, Please fill out this form.</p>

        {/* contact - form  */}
        <div className='my-12 mx-auto'>
            <ContactForm/>
        </div>
    </div>
  )
}

export default ContactFormSection