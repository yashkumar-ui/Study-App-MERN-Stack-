import React from 'react'

const StatsData = [
    { count: "5K", label: "Active Students" },
    { count: "10+", label: "Mentors" },
    { count: "200+", label: "Courses" },
    { count: "50+", label: "Awards" },
  ];

const Stats = () => {
  return (
    <div className='bg-richblack-700'>
        <div className='mx-auto w-11/12  max-w-maxContent flex flex-col '>
           <div className="grid grid-cols-2 md:grid-cols-4 text-center">
               {
                 StatsData.map( (data , index) => {
                    return (
                        <div key={index} className='flex flex-col gap-y-3 py-[4rem]'>
                            <h1 className='text-richblack-5 text-3xl font-bold'>{data.count}</h1>
                            <h2 className='text-richblack-300 tracking-wide font-[400] text-[16px]'>{data.label}</h2>
                        </div>
                    )
                 } )
               }
           </div>
        </div>
    </div>
  )
}

export default Stats
