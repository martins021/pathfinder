"use client"
import React from "react";
import { Select, Heading } from '@chakra-ui/react'
import { sortingOptions } from "@/lib/configs";
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'

const Sorters = ({sorters, setSorters}) => {
  const handleDirectionChange = () => {
    let newDirection;
    if(sorters.direction === "desc"){
      newDirection = "asc"
    } else {
      newDirection = "desc"
    }

    setSorters({
      ...sorters,
      direction: newDirection
    })
  }

  return (
    <div className="text-customWhite mb-6">
      <div className="flex flex-row gap-2 justify-start">
        <h1 className="text-xl" style={{ width: "10vw" }}>Sort by: </h1>
        <div 
          className="cursor-pointer" 
          onClick={handleDirectionChange}
        >
          {sorters.direction === "desc" ? 
            (<ArrowDownIcon w={9} h={9} />) : 
            (<ArrowUpIcon w={9} h={9} />)
          }
        </div>
        <Select 
          variant='outline' 
          icon={<></>}
          onChange={(e) => setSorters({ ...sorters, param: e.target.value })}
          value={sorters.param}
          style={{ width: 200 }}
        >
          {sortingOptions.map((option, index) => (
            <option 
              key={index} 
              value={option.value}
              style={{ 
                backgroundColor: 'rgb(63, 63, 63)' 
              }}
            >
              {option.label}
            </option>
          ))}
        </Select>
        

      </div>
    </div>
  )
}

export default Sorters;