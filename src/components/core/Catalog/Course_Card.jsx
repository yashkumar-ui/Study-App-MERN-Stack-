import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utilis/avgRating';
import RatingStars from '../../common/RatingStars';

const Course_Card = ({course , Height}) => {
    // console.log("course-->" , course)
    const [avgReviewCount , setAvgReviewCount]= useState(0);
    // at first render
    useEffect( () => {
        const count = GetAvgRating(course.ratingandReviews);
        setAvgReviewCount(count);
    } , [course] )

  return (
    <>
        <Link to={`/courses/${course._id}`}> 
            <div className='rounded-lg'>
                <img src={course?.thumbnail}
                    alt="course - thumbnail"
                    className={`${Height} w-full rounded-xl object-fill`}
                />
            </div>
            <div className='flex flex-col gap-2 px-1 py-3'>
                <p className='text-richblack-5 text-xl'>{course?.courseName}</p>
                <p className='text-sm text-richblack-50'>
                    {course?.instructor?.firstName} {" "} {course?.instructor?.lastName}
                </p>
                 {/* Course Rating */}
                <div className='flex items-center gap-2'>
                  <span className='text-yellow-50'>{avgReviewCount || 0 }</span>
                  <RatingStars Review_Count={avgReviewCount}/>
                  <span className='text-richblack-400 '>
                    {course?.ratingandReviews?.lenght} Ratings
                  </span>
                </div>
                <p className='text-richblack-5 text-xl'>Rs .{course?.price} </p>
            </div>
        </Link>
    </>
  )
}

export default Course_Card