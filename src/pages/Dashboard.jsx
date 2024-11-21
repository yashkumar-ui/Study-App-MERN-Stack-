import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar'

const Dashboard = () => {
    // import the user and the token loading from the states 
    const {loading : authLoading} = useSelector( (state) => state.auth)
    const {loading : profileLoading } = useSelector( (state) => state.profile)

    if( authLoading || profileLoading){
        return (
            <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
                <div className='spinner'></div>
            </div>
        )
    }

    // left side ->> sideBar --> use to take to the differernt links 
    // outlet ->> use to take to the component that render on the basics of the sidebar 

  return (
    <div className='realtive  flex min-h-[calc(100vh-3.5rem)]'>
       <Sidebar/>
       <div className=' h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
           <div className='mx-auto w-11/12 max-w-maxContent scroll-auto py-10'>
              <Outlet/>
           </div>
       </div>

    </div>
  )
}

export default Dashboard