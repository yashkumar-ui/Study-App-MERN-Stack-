import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector'
import { categories } from '../services/apis'
import { getCatalogPageData } from '../services/operations/PageAndComponentData'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import CourseCard from '../components/core/Catalog/CourseCard'
import Footer from '../components/common/Footer'

const Catalog = () => {
    // const {loading } = useSelector( (state) => state.profile)
    const {catalogName} = useParams();
    //convert the name into the object id
    const [ active , setActive ] = useState(1);
    const[categoryId , setCategoryId] = useState("");  
    const[catalogPageData , setCatalogPageData] = useState(null);
    // console.log(catalogName);

    useEffect( () => {
        const fetchAllCategories = async () => {
            const response = await apiConnector("GET" ,categories.CATEGORIES_API )
            console.log("category response" , response.data.allCategory);
            const categoryData = response?.data?.allCategory?.filter(
                (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
            )
            const category_Id= categoryData[0]._id;
            setCategoryId(category_Id)
            console.log("Category data -->" , categoryData)
            console.log("category id --> ", category_Id)
        }

        fetchAllCategories();
    } , [catalogName])

    // fetch the particular category page full data 
    useEffect( () => {
        if(categoryId){
            const catalogaApiPageData = async () => {
                const response = await getCatalogPageData(categoryId);
                
                if(response){
                    // console the response 
                    console.log("catalog page data -< ",response);
                    setCatalogPageData(response);
                }
            }
            catalogaApiPageData();
        }
    }, [categoryId])



  return (
    <>
        {/* Hero Section  */}
        <div className=' box-content bg-richblack-800 px-4'>
            <div className='mx-auto flex py-[3rem] gap-4 lg:max-w-maxContent max-w-maxContentTab flex-col '>
                {/* url type */}
                <p className='text-sm text-richblack-300'>
                    {`Home / Catalog / `}
                    <span className='text-yellow-25'>
                        {catalogPageData?.data?.selectedCategory?.name}
                    </span>
                </p>
                <p className='text-3xl text-richblack-5'>
                    {catalogPageData?.data?.selectedCategory?.name}
                </p>
                <p className='max-w-[870px] tracking-wide text-richblack-200'>
                    {catalogPageData?.data?.selectedCategory?.description}
                </p>
            </div>
        </div>

        {/* Section - 1  */}
        <div className='mx-auto box-content w-full max-w-maxContent px-4 py-12 lg:max-w-maxContent'>
            <div className='text-2xl font-bold lg:text-3xl text-richblack-5'>Courses to get you started</div>

            {/* Buttons --> latest , trendinh , etc */}
            <div className= "my-4 flex border-b border-b-richblack-600 text-sm">
                <p className={`px-4 py-2 cursor-pointer 
                   ${active === 1 ? "text-yellow-25 border-b" : "text-richblack-50"}
                `} onClick={() => setActive(1)}
                >Most popular</p>
                <p className={`px-4 py-2 cursor-pointer
                   ${active === 2 ? "text-yellow-25 border-b" : "text-richblack-50"}
                `} onClick={() => setActive(2)}>Trending</p>
                
            </div>

            {/* Slider */}
            <div>
                <CourseSlider Courses = {catalogPageData?.data?.selectedCategory?.courses}/>
            </div>
        </div>

        {/* Section - 2  */}
        <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
            <div className='text-2xl font-bold lg:text-3xl text-richblack-5'>Top Coures</div>
            <div className='py-8'>
                {/* Slider */}
                <CourseSlider Courses = {catalogPageData?.data?.mostSellingCourses}/>
            </div>
        </div>

        {/* Section - 3  */}
        <div className='mx-auto box-content w-full max-w-maxContentTab lg:max-w-maxContent px-4 py-12'>
            <div className= ' text-2xl font-bold lg:text-3xl text-richblack-5'>Frequently Bought Together</div>
            {/* Show course card */}
            <div className='py-8'>
                <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 '>
                    {catalogPageData?.data?.mostSellingCourses?.slice(0,4).map( (course ,i) => ( <CourseCard course={course} key={i} Height={"h-[350px]"}/>))
                    }
                </div>
            </div>
        </div>

        {/* Footer */}
        <Footer/>

    </>
  )
}

export default Catalog