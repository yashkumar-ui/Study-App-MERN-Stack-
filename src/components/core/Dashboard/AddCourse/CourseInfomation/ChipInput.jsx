import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MdClose } from "react-icons/md"

const ChipInput = ({label ,name , placeholder , register , errors , setValue, getValues }) => {
    const {editCourse , course} = useSelector( (state) => state.course )
    const [chips , setChips] = useState([]);

    // when the changes in the ui happen , then we will call it 
    useEffect( () => {
        if(editCourse) {
            setChips(course?.tag)
        }
        register(name , {required:true , validate: (value) => value.length > 0})
         // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [])

    useEffect( () => {
        setValue(name , chips)
         // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [chips])


    // function that handle the enter key press functionallity 
    const handleKeyDown = (event) => {
        // check if the enter is press or not ,
        if(event.key === "Enter" || event.key === ","){
            event.preventDefault();
            //take the input and remjove any spaces from that 
            const chipValue = event.target.value.trim();

            //check if the value is not present in the chips array
            if(chipValue && !chips.includes(chipValue)){
                // add it to the array 
                const newChips = [...chips, chipValue]
                setChips(newChips);
                event.target.value = ""
            }

        }
    }

    // deleation of the chips 
    const handleDeleteChip = (chipIndex) => {
        // filter the chip and remove the index that is given 
        const newChips = chips.filter( (_, index) => index !== chipIndex)
        setChips(newChips);
    }



  return (
    <div className='flex flex-col space-y-2'>
        <label className='text-sm text-richblack-5 font-[300] ml-1'>
            {label}<sup className='text-pink-200'>*</sup>
        </label>

        {/* chip input + render it on the ui  */}
        <div className='flex w-full flex-wrap gap-y-2'>
            {/* chip input renders here  */}
            {
                chips.map( (exe , i) => (
                    <div className='m-1 flex items-center  rounded-full bg-yellow-400 px-2 py-2 text-sm text-richblack-5' key={i}>
                      {exe}
                      {/* button that handle the event of the removings */}
                      <button type='button' className='ml-2 focus:outline-none'
                        onClick={() => handleDeleteChip(i)}
                      >
                         <MdClose className="text-sm" />
                      </button>
                    </div>
                ))
            }

            <input
                type='text'
                id={name}
                name={name}
                placeholder={placeholder}
                onKeyDown={handleKeyDown}
                style={{
                   boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
            />
        </div>
        {
            errors[name] && (
                <span className='text-pink-200 tracking-wide ml-2 text-xs'>
                    {label} is required
                </span>
            )
        }
    </div>
  )
}

export default ChipInput