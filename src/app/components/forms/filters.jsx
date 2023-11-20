"use client"
import React from "react";
import { algorithmOptions, animationSpeedOptions } from "@/lib/configs";

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
    <div className="flex-col space-y-4 text-customWhite">
      <div>
        Map name
        <input 
          style={{ color: "black" }}
          value={filters.name ?? ""} 
          onChange={onNameChange} 
        />
      </div>
      <div className="flex flex-col">
        Animation speed
        {animationSpeedOptions.map((opt, i) => (
          <span key={i}>
            <input 
              type="checkbox" 
              name="animationSpeed" 
              id={`animationSpeed_${opt.value}`} 
              value={opt.value} 
              onChange={(e) => onCheckBoxGroupChange(e, "animationSpeed")} 
            /> 
            <label>{opt.label}</label>
          </span>
        ))}
      </div>
      <div className="flex flex-col">
        Algorithm
        {algorithmOptions.map((opt, i) => (
          <span key={i}>
            <input 
              type="checkbox" 
              name="algorithm" 
              id={`algorithm_${opt.value}`} 
              value={opt.value} 
              onChange={(e) => onCheckBoxGroupChange(e, "algorithm")} 
            /> 
            <label>{opt.label}</label>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Filters;