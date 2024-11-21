import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getFullDataOfCourse } from '../services/operations/courseDetailsAPI'
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice'
import CoursereviewModal from '../components/core/ViewCourse/CoursereviewModal'

const ViewCourse = () => {
    const{token} = useSelector((state) => state.auth);
    const{courseId} = useParams();
    const dispatch = useDispatch();
    const [reviewModal , setReviewModal] = useState(false);
 

    useEffect( () => {
        ;( async () => {
            const courseData = await getFullDataOfCourse(courseId , token);
            console.log("data success -->", courseData);
            dispatch(setEntireCourseData(courseData.courseDetails))
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
            dispatch(setCompletedLectures(courseData.completedVideos))
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach( (sec) => {
                lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures))


        })()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <>
        <div className='relative bg-[#F4FDFF] flex min-h-[calc(100vh-3.5rem)]'>
             <VideoDetailsSidebar setReviewModal={setReviewModal}/>
             <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
                <div className='mx-6'>
                    <Outlet/>
                </div>
             </div>
        </div>
        {reviewModal && <CoursereviewModal setReviewModal = {setReviewModal} />}
    </>
  )
}

export default ViewCourse