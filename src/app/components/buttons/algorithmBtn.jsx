"use client"
import React from "react";


const AlgorithmBtn = ({ onClick, title, selected }) => {
  return(
    <button 
      onClick={onClick} 
      className={
        `transition duration-300 ease-in-out 
        ${selected ? 'bg-customYellowHover' : 'bg-customYellow'} 
        hover:bg-customYellowHover 
        rounded p-4 text-xl font-semibold`
      }
    >
      {title}
    </button>
  )
};

export default AlgorithmBtn;