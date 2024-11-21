import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {IoIosArrowBack} from "react-icons/io"
import {HiChevronDoubleDown} from "react-icons/hi"

const VideoDetailsSidebar = ({setReviewModal}) => {
    const {sectionId , subSectionId} = useParams();
    const { courseSectionData ,
        courseEntireData , 
        totalNoOfLectures,
        completedLectures,
    } = useSelector( (state) => state.viewCourse);
    const navigate = useNavigate();
    const location = useLocation();

    // active show krna 
    const [activeStatus , setActiveStatus] = useState("");
    const [videoBarActive , setVideoBarActive] = useState("");
    // console.log("active status -->", activeStatus);

    /// on first call we will compare the data 
    useEffect( () => {
        ;( () => {
            // if no section just return it 
            if(!courseSectionData.length) return 

            // compare the index of parmas to the state index to get the current index 
            const currentSectionIndex = courseSectionData.findIndex( 
                (data) => data._id === sectionId
            )
            // same apply for the subsection part also 
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex( (data) => data._id === subSectionId)

            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id

            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)
            setVideoBarActive(activeSubSectionId)
        }) ()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseSectionData , courseEntireData , location.pathname])

  return (
    <>
        <div className='flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-pure-greys-400 bg-[#F8F9FA]'>
            {/* Heading */}
           <div className='mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold'>
              <div className='flex w-full items-center justify-between'>
                  <div onClick={ () => navigate("/dashboard/enrolled-courses")} className='flex h-[35px] text-[#162560] w-[35px] items-center justify-center rounded-full hover:scale-90 transition-all duration-200 cursor-pointer'>
                     <IoIosArrowBack size={30} />
                   </div>

                  {/* create the Review Button later */}
                  <button onClick={() => setReviewModal(true) } className='px-4 py-2 text-white text-sm hover:scale-95 hover:bg-[#3835e6] transition-all duration-200 font-medium rounded-md bg-[#5755D8]'>
                     Add Review
                  </button>

              </div>
              <div className='flex w-full justify-between items-center'>
                <p className='text-[#162560]'>{courseEntireData?.courseName}</p>
                <p className='text-[#162560] select-none'>
                    {completedLectures.length} / {totalNoOfLectures}
                </p>
              </div>
           </div>

           {/* video sections  */}
           <div className='h-[calc(100vh-6rem)] overflow-y-auto'>
               { courseSectionData && (
                  courseSectionData.map( (section , index) => (
                    <div key={index}  onClick={() => { setActiveStatus(section?._id) }}
                     className='mt-2 cursor-pointer text-sm text-[#393F41]' >
                        {/* Section */}
                        <div className='flex flex-row justify-between px-5 py-4 '>
                             <div className='font-semibold text-[#393F41]'>
                                 {section?.sectionName}
                             </div>
                             <div className='flex items-center gap-3 text-[20px]'>
                                 <span className={`${ activeStatus === section?._id ? "" : "-rotate-90"} transition-all duration-500`}>
                                     <HiChevronDoubleDown />
                                 </span>
                             </div>
                        </div>

                        {/* Sub Section */}
                        { activeStatus === section?._id && (
                            <div className='transition-[height] w-full duration-500 ease-in-out'>
                                {section.subSection.map( (topic , i) => (
                                    <div key={i}  onClick={ () => { navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                                     setVideoBarActive(topic._id)}}
                                       className={`flex ml-5 gap-3 font-[400] tracking-wide px-5 py-2
                                            ${ videoBarActive === topic._id ? "bg-[#5755D8] font-[400] text-richblack-5" : "hover:bg-[#d2d2f4]"} `}>
                                        <input 
                                            type='checkbox'
                                            checked={completedLectures.includes(topic?._id)}
                                            onChange={() => {}}
                                        />
                                        {topic.title}
                                    </div>
                                ) )}
                            </div>
                        )}
                    </div>
                  ))
               )}
           </div>

        </div>
    </>
  )
}

export default VideoDetailsSidebar