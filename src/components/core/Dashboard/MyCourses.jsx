import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {IoAddCircleOutline} from "react-icons/io5"
import { getAllInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import CourseTable from './InstructorCourses/CourseTable';

const MyCourses = () => {
    const[courses , setCourses] = useState([]);
    const {token} = useSelector( (state) => state.auth);
    const navigate = useNavigate();

    useEffect( () => {

        // functiojn fetch the courses
        const fetchCourses = async () => {
            const result = await getAllInstructorCourses(token);

            if(result){
                setCourses(result);
            }
        }

        fetchCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [])


  return (
    <div>
        <div className='w -full mb-14 flex items-center justify-between' >
            <h1 className='text-3xl font-medium text-richblack-5 '>My Courses</h1>
            <button onClick={ () => navigate("/dashboard/add-course")}
               className='flex items-center px-[20px] py-[8px] font-[400] gap-x-2 hover:scale-95 transition-all duration-200 bg-yellow-50 rounded-md'>
               
                New
                <IoAddCircleOutline size={20}  />
            </button>
        </div>
        {
            courses && <CourseTable courses = {courses} setCourses = {setCourses} />
        }


    </div>
  )
}

export default MyCourses