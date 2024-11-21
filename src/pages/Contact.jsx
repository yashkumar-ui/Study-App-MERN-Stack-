import React from 'react'
import ContactPageDetails from '../components/core/ContactUsPage/ContactPageDetails'
import ContactPageForm from '../components/core/ContactUsPage/ContactPageForm'
import Footer from '../components/common/Footer'

const Contact = () => {
  return (
    <div>
         {/* Contact -- Page  */}
         <div className='w-11/12 mx-auto max-w-maxContent flex flex-col lg:flex-row justify-center my-12 gap-10 text-white'>
            
            {/* Contact -- Details Page */}
             <div className='lg:w-[40%]'>
                <ContactPageDetails/>
             </div>

            {/* contact - from section  */}
            <div className='lg:w-[60%]'>
                <ContactPageForm/>
            </div>

         </div>

         {/* Review Slider  */}

         {/* Footer */}
         <Footer/>
    </div>
  )
}

export default Contact