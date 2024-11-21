import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';

const Cart = () => {
    const {total , totalItems} = useSelector( (state) => state.cart);

  return (
    <>
        <h1 className='mb-12 text-3xl tracking-wide font-[400] text-richblack-5 '>My Wishlist</h1>
        <p className='border-b border-b-richblack-400 pb-2 font-[400] text-richblack-100'>
            {totalItems}   Courses in Cart
        </p>
        {
            total > 0 ? (
                <div className='mt-8 flex justify-between flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row'>
                   <RenderCartCourses/>
                   <RenderTotalAmount/>
                </div>
            ) :
             (<div className='text-richblack-5 w-full mt-14 flex justify-center items-center'>
                 <p className='text-3xl font-[400] tracking-wider underline'>Your cart is Empty</p>
             </div>)
        }
    </>
  )
}

export default Cart