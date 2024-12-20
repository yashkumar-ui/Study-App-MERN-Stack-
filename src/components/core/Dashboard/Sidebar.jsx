import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sidebarLinks } from '../../../data/dashboard-links'
import SidebarLink from './SidebarLink'
import { logout } from '../../../services/operations/authAPI'
import ConfirmationModal from '../../common/ConfirmationModal'
import { VscSignOut } from "react-icons/vsc"
import { LuChevronFirst , LuChevronLast } from "react-icons/lu";
 
const Sidebar = () => {
    // import the states 
    const {  user , loading: profileLoading}  = useSelector( (state) => state.profile)
    const { loading: authLoading} = useSelector( (state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [confirmationModal , setConfirmationModal] = useState(null);
    const [expanded , setExpanded] = useState(true);


    if ( profileLoading || authLoading){
        return (
            <div className='grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800'>
                <div className='spinner'></div>
            </div>
        )
    }


  return (
    <>
        <div className = {`flex h-[calc(100vh-3.5rem)] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 ${expanded && "min-w-[220px]"} `}>
            <button onClick={() => setExpanded((curr) => !curr)} className=' bg-richblack-300 rounded-lg ml-auto mr-5  w-fit'>
                 { expanded ? (<LuChevronFirst />) : (<LuChevronLast />)}
            </button>
           <div className='flex flex-col'>
              {
                sidebarLinks.map( (link) => {
                    if(link.type && user?.accountType !==link.type) return null

                    return (
                        <SidebarLink key={link.id} link={link} iconName={link.icon} expanded = {expanded}/>
                    )
                })
              }
           </div>

           <div className={`mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700 `} />
           {/* Setting link --path */}
           <div className='flex flex-col'>
               <SidebarLink 
                link={{name: "Settings" , path:"/dashboard/settings" }}
                iconName="VscSettingsGear" expanded = {expanded}
               />

               {/* button for the signout */}

               <button
                  onClick={ () => 
                      setConfirmationModal({
                         text1:"Are you sure ?.",
                         text2:"You will be logged out of your account.",
                         btn1Text: "Logout",
                         btn2Text: "Cancel",
                         btn1Handler: () => dispatch(logout(navigate)),
                         btn2Handler: () => setConfirmationModal(null),
                      })
                  }
                 className='px-8 py-2 text-sm font-medium text-richblack-300'
               >
                    <div className='flex items-center gap-x-2'>
                         <VscSignOut className="text-lg" />
                         <span className={` ${expanded ? " block" : "hidden"}`}>Logout</span>
                    </div>
               </button>

           </div>

        </div>

        {/* confirmation Modal that return above the dashboard  */}
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </>
  )
}

export default Sidebar