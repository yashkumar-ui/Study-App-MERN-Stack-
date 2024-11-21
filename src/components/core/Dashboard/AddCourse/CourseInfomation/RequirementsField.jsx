import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const RequirementsField = ({name , label , placeholder , errors, register , setValue , getValue}) => {
   
    const {editCourse , course} = useSelector( (state) => state.course)
    const [requirement , setRequirement] = useState("")
    const [requirementList , setRequirementList] = useState([]);

    useEffect( () => {
        if(editCourse) {
            setRequirementList(course?.instructions)
        }
        register(name , {required : true , validate: (value) => value.length > 0 })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect( () => {
        setValue( name , requirementList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [requirementList] )

    // add the data to the list and display it on the ui
    const handleAddRequirement = () => {
        if(requirement){
            setRequirementList([ ...requirementList ,requirement])
            setRequirement("")
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirements = [...requirementList]
        updatedRequirements.splice(index , 1)
        setRequirementList(updatedRequirements)
    }

  return (
    <div className='flex flex-col space-y-2'>
        <label htmlFor={name} className='text-sm ml-1 text-richblack-5 font-[300] '>
          {label} <sup className='text-pink-200'>*</sup>
        </label>

        {/* input fields and the add button  */}
        <div className='flex flex-col items-start space-y-3'>
            <input
                id={name}
                type='text'
                name={name}
                placeholder={placeholder}
                value={requirement}
                onChange={ (e) => setRequirement(e.target.value)}
                style={{
                   boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
            />
            <button type='button'  onClick={handleAddRequirement}
               className='text-yellow-50 hover:scale-95 transition-all duration-200 font-semibold text-lg ml-1'>
                Add
            </button>
        </div>
        {
            requirementList.length > 0 && (
                <ul className='mt-2 list-inside list-disc'>
                    {
                        requirementList.map( (exe , i) => (
                            <li key={i} className='flex items-center text-richblack-5'>
                                <span>{exe}</span>
                                <button
                                  type='button'
                                  className='ml-2 text-xs text-pure-greys-300'
                                  onClick={ () => handleRemoveRequirement(i)}
                                >
                                    clear
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        {
            errors[name] && (
                <span className='text-pink-200 text-xs tracking-wide ml-2'>
                    {label} is required
                </span>
            )
        }
    </div>
  )
}

export default RequirementsField