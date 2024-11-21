import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { BuyCourse } from '../../../../services/operations/studentsFeaturesAPI';

const RenderTotalAmount = () => {
    const {total , cart} = useSelector( (state) => state.cart);
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = () => {
        // make a course array and enroll the students
        const courses = cart.map( (course) => course._id)
        // call the buy now function
        BuyCourse(token , courses , user , navigate , dispatch)
    }


  return (
    <div className='min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
       <p className='mb-1 text-sm text-richblack-300 font-medium '>Total:</p>
       <p className='mb-6 mt-3 text-3xl font-medoum text-yellow-100 '>₹ {total}</p>

       <button onClick={handleBuyCourse} className=' hover:scale-95 font-[400] transition-all duration-200 w-full py-3 bg-yellow-50 rounded-md text-richblack-900'>Buy Now</button>
    </div>
  )
}

export default RenderTotalAmount