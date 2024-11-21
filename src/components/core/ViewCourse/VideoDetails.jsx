import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { BigPlayButton, Player } from 'video-react';
import { markLectureComplete } from '../../../services/operations/courseDetailsAPI';
import { updatedCompletedLectures } from '../../../slices/viewCourseSlice';
import {FaCheckCircle} from "react-icons/fa"

const VideoDetails = () => {
   const {courseId , sectionId , subSectionId} = useParams();
   const navigate = useNavigate();
   const location = useLocation();
   const dispatch = useDispatch();
   const playerRef = useRef(null);
   const {token} = useSelector( (state) => state.auth);
   const {courseEntireData , courseSectionData , completedLectures } = useSelector( (state) => state.viewCourse);
   const [ videoLoading , setVideoLoading] = useState(true);

   const [videoData  , setVideoData] = useState(false);
   const [previewSource , setPreviewSource ] = useState("");
   const [videoEnd , setVideoEnd] = useState(false);
   const [loading , setLoading] = useState(false);

   // fetch the video from the first render 
   useEffect( () => {
      ;( () => {
          if(!courseSectionData.length) return 
          if( !courseId && !sectionId && !subSectionId ){
              navigate(`/dashboard/enrolled-courses`)
          }else {
              // console.log("section --> data ", courseSectionData);
              const filteredData = courseSectionData.filter(
                 (course) => course._id === sectionId
              )
              console.log("Filter Data " , filteredData)

              if (!filteredData.length || !filteredData[0]?.subSection) {
                console.log("No valid section or subsection found");
                setVideoLoading(false); // Stop loading if data is missing
                return;
              }
              // for the subsection Video Data 
              const filterVideoData = filteredData?.[0]?.subSection.filter(
                (data) => data._id === subSectionId
              )

              console.log("Vide of filter data ", filterVideoData);
              setVideoData(filterVideoData[0])
              setPreviewSource(courseEntireData.thumbnail)
              setVideoEnd(false);
          }
      })()
       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [courseSectionData, courseEntireData, location.pathname])

   //check if the lecture is the first video of course 
   const isFirstVideo = () => {
       //
       const currentSectionIndex = courseSectionData.findIndex(
         (data) => data._id === sectionId
       )

       const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex( (data) => data._id === subSectionId)

       if(currentSectionIndex === 0 && currentSubSectionIndex ===0){
        return true;
       }else{
        return false
       }
   }

   // go to the next video
   const  goToNextVideo = () => {
      
     const currentSectionIndex = courseSectionData.findIndex( (data) => data._id === sectionId)

     const noOfSubsections = courseSectionData[currentSectionIndex].subSection.length

     const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex( (data) => data._id === subSectionId);

     if(currentSubSectionIndex !== noOfSubsections -1){
        const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id
        navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
     } else{
         const nextSectionId = courseSectionData[currentSectionIndex + 1]._id

         const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id
         navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
     }
   }

   // check if the lecture is the last video of the course 
   const isLastVideo = () => {
     const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);

     const noOfSubsections = courseSectionData[currentSectionIndex].subSection.length

     const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex( (data) => data._id === subSectionId)

     if( currentSectionIndex === courseSectionData.length-1 && currentSubSectionIndex === noOfSubsections -1 ){
        return true
     }else{
      return false
     }
   }

   // go to the previous video 
   const goToPrevVideo = () => {
      
      const currentSectionIndex = courseSectionData.findIndex( (data) => data._id === sectionId);

      const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex( (data) => data._id === subSectionId)

      if( currentSubSectionIndex !== 0){
        const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSectionIndex - 1]._id

        navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
      }else{
          const prevSectionId = courseSectionData[currentSectionIndex - 1]._id
          const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length
          const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id

          navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
      }
   }

   // handle the complete lecture function 
   const handleLectureCompletion = async () => {
      setLoading(true);
      const res = await markLectureComplete(
        {courseId: courseId , subSectionId : subSectionId }, token
      )

      if(res){
        dispatch(updatedCompletedLectures(subSectionId))
      }
      setLoading(false);
   }


  return (
    <div className='flex w-[90%] mx-auto my-12 flex-col gap-5 '>
        {/* player for video  */}
        {!videoData ? (
          <div>
              <div className='spinner'></div>
          </div>
        ) : (
         <div className='flex flex-col space-y-4'>
             <div className='flex justify-end mr-3'>
                 <button onClick={ !completedLectures.includes(subSectionId)? () => handleLectureCompletion() : ()=>{} }
                     className='px-6 py-3 text-white flex flex-row items-center gap-x-2 text-sm hover:scale-95 hover:bg-[#3835e6] transition-all duration-200 font-medium rounded-sm bg-[#5755D8]'
                   >
                      { !completedLectures.includes(subSectionId)  ?   (!loading ? "Mark as Complete" : "Loading...") : ("Completed" )}
                      { completedLectures.includes(subSectionId) && (<span className='text-lg text-caribbeangreen-200'> <FaCheckCircle /></span>)}
                  </button>
             </div>
          <Player ref={playerRef}
            aspectRatio='16:9'
            playsInline
            onEnded={ () => setVideoEnd(true)}
            src={videoData?.videoUrl}
            width={"100"}
            height={"auto"}
            fluid={true}
          >
             <BigPlayButton position='center'/>
             {/* Render When Video Ends */}
             {videoEnd && (
               <div
                   style = {{
                    backgroundImage:
                    "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                   }}
                   className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
               > 

                <button disabled={loading}
                  onClick={ () => {
                    if(playerRef?.current) {
                      // set the current time of the video as )
                      playerRef?.current?.seek(0);
                      setVideoEnd(false)
                      playerRef.current.play();
                    }
                  }}
                   className='px-4 py-2 mt-4 text-white mx-auto text-sm hover:scale-95 hover:bg-[#3835e6] transition-all duration-200 font-medium rounded-md bg-[#5755D8]'>
                     Rewatch 
                 </button>

                 {/* Prev or next video buttons  */}
                  <div className='mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl'>
                     {!isFirstVideo() && (
                        <button disabled = {loading}
                           onClick={goToPrevVideo}
                           className='px-4 py-2 text-white text-sm hover:scale-95 hover:bg-[#3835e6] transition-all duration-200 font-medium rounded-md bg-[#5755D8]'
                         >
                            Prev
                        </button>
                     )}
                     {!isLastVideo() && (
                        <button disabled={loading}
                          onClick={goToNextVideo}
                          className='px-4 py-2 text-white text-sm hover:scale-95 hover:bg-[#3835e6] transition-all duration-200 font-medium rounded-md bg-[#5755D8]'
                        >
                           Next
                        </button>
                     )}
                  </div>
               </div>
             )}

          </Player>

         </div> 

        )}

        <h1 className='mt-8 text-[#50596B] text-[32px] leading-[38px] ml-2 font-[500] '>{videoData?.title}</h1>
        <p className='ml-2 '> <span>Description : </span>{videoData?.description}</p>
    </div>
  )
}

export default VideoDetails