import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import imageLogo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useSelector } from 'react-redux'
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import {IoIosArrowDropdownCircle} from "react-icons/io"


const Navbar = () => {
    const location = useLocation();
    const {token} = useSelector( (state) => state.auth );
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart );

    const matchRoute = (route) => {
        return matchPath( {path:route} , location.pathname);
    }

    const [subLinks , setSubLinks ] = useState([])

    // calling the api that we created in services section 

    const fetchSubLinks = async () => {
        try{
            const result = await apiConnector("GET" , categories.CATEGORIES_API  );
            // save the result to the sublibks array we created 
            console.log("print data for the categories " , result.data);
            setSubLinks(result.data.allCategory);
            
            console.log(subLinks);
        } catch(err){
            console.log("could not fetch the category list ");
        }
    }

    useEffect( () => {
        fetchSubLinks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [])


  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
       <div className='w-11/12 max-w-maxContent mx-auto flex justify-between items-center  '>
           
           {/* image - logo  */}
           <Link to="/">
                <img src={imageLogo} width={160} alt='logowhite' height={42} loading='lazy'/>
           </Link>

           {/* Nav links  */}
           <nav className=' text-richblack-25 hidden md:block'>
               <ul className='flex flex-row gap-x-6' >
                  {
                     NavbarLinks.map( (link , index ) => (
                         <li key={index} className='relative group hover:scale-95 transition-all duration-200 z-10 ' >
                              {
                                  link.title === "Catalog" ? (
                                    <div className='relative flex items-center cursor-pointer gap-2 group'>
                                        <p>{link.title}</p>
                                        <IoIosArrowDropdownCircle/>
                                        
                                        {/* drop Down menu  */}
                                            <div className='invisible absolute -left-20 top-full mt-2 z-50 w-[300px] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100'>
                                                {
                                                    subLinks ? (
                                                        subLinks.map( (xyz , index) => (
                                                           <Link key={index} to={`/catalog/${xyz.name
                                                               .split(" ")
                                                               .join("-")
                                                               .toLowerCase()}`} className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50" >
                                                                <p className='hover:scale-95 transition-all duration-200'>{xyz.name}</p>
                                                            </Link>
                                                        ))
                                                    ) 
                                                    : (<div></div>)
                                                }
                                            </div>
                                        
                                    </div>
                                  ) : (
                                    <Link to={link?.path} >
                                         <p className= {` ${matchRoute(link?.path) ? "text-yellow-25" : " text-richblack-25"}`} >
                                            {link.title}
                                         </p>
                                    </Link>
                                  ) 
                              }
                         </li>
                     ) )
                  }
               </ul>
           </nav>

           {/* login-signup-dashboard */}
           <div className=' md:flex hidden flex-row gap-x-4 items-center '>
               {/* main logic is written here 
               if token == null ----> login and signup button show krne hai 
               if token !null , agr student hai ---> cart show krna , profile shows as usual
               if instructor , cart show nhi krna , profile shows as usual   */}
                {
                     user && user?.accountType !== "Instructor" && (
                        <Link to="/dashboard/cart" className='relative'>
                             <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                             {
                                totalItems > 0 && (
                                    <span className='absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100'>
                                        {totalItems}
                                    </span>
                                )
                             }
                        </Link>
                     )
                }

                {
                    token === null && (
                        <Link to="/login">
                             <button className='border border-richblack-700 hover:scale-90 transition-all duration-200 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                 Log in
                             </button>
                        </Link>
                    )
                }

                {
                    token === null && (
                        <Link to="/signup">
                            <button className='border border-richblack-700 hover:scale-90 transition-none duration-200 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                Sign up
                            </button>
                        </Link>
                    )
                }

                {/* if token is not equal to null , means user login hai , */}

                {
                    token != null && <ProfileDropDown />
                }



           </div>

           <button className="mr-4 md:hidden">
              <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
           </button>


       </div>

    </div>
  )
}

export default Navbar