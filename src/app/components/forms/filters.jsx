"use client"
import React from "react";
import { algorithmOptions, animationSpeedOptions, sizeOptions } from "@/lib/configs";
import { 
  Input, 
  Divider, 
} from '@chakra-ui/react'

const Filters = ({ filters, setFilters }) => {
  const onNameChange = (e) => {
    if(!e.target.value) {
      const copy = structuredClone(filters);
      delete copy.name;
      setFilters(copy);
    } else {
      setFilters({ ...filters, name: e.target.value })
    }
  }

  const onCheckBoxGroupChange = (e, group) => {
    const currArr = filters[group] ?? []
    if(e.target.checked){
      currArr.push(e.target.value)
    } else {
      var index = currArr.indexOf(e.target.value);
      if (index !== -1) currArr.splice(index, 1);
    }
    const copy = structuredClone(filters);
    if(currArr.length === 0){
      delete copy[group];
      setFilters(copy);
    } else {
      setFilters({ ...filters, ...{ [group]: currArr } })
    }
  }

  return(
    <div className="flex-col space-y-4 text-customWhite mr-6" >
      <div>
        <p className="mb-2 font-semibold">Map name</p>
        <Input 
          value={filters.name ?? ""} 
          onChange={onNameChange} 
        />
      </div>

      <Divider />
      <div className="flex flex-col">
        <p className="mb-2 font-semibold">Algorithm</p>
        {algorithmOptions.map((opt, i) => (
          <span key={i} className="p-2">
            <input 
              className="w-4 h-4 cursor-pointer mr-2"
              type="checkbox" 
              name="algorithm" 
              id={`algorithm_${opt.value}`} 
              value={opt.value} 
              onChange={(e) => onCheckBoxGroupChange(e, "algorithm")} 
            /> 
            <label className="font-light">{opt.label}</label>
          </span>
        ))}
      </div>

      <Divider />
      <p className="mb-2 font-semibold">Animation speed</p>
      <div className="flex flex-row flex-wrap">
          {animationSpeedOptions.map((opt, i) => (
            <div key={i} className="w-1/3 p-2">
              <input 
                className="w-4 h-4 cursor-pointer mr-2"
                type="checkbox" 
                name="animationSpeed" 
                id={`animationSpeed_${opt.value}`} 
                value={opt.value} 
                onChange={(e) => onCheckBoxGroupChange(e, "animationSpeed")} 
              /> 
              <label className="font-light">{opt.label}</label>
            </div>
          ))}
      </div>

      <Divider />
      <p className="mb-2 font-semibold">Map size</p>
      <div className="flex flex-row flex-wrap">
          {sizeOptions.map((opt, i) => (
            <div key={i} className="w-1/3 p-2">
              <input 
                className="w-4 h-4 cursor-pointer mr-2"
                type="checkbox" 
                name="size" 
                id={`size${opt.value}`} 
                value={opt.value} 
                onChange={(e) => onCheckBoxGroupChange(e, "size")} 
              /> 
              <label className="font-light">{opt.label}</label>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Filters;