import React from "react";

const AlgorithmBtn = ({ onClick, title, selected }) => {
  return(
    <button 
      onClick={onClick} 
      className={
        `transition duration-200 ease-in-out 
        hover:bg-customYellowHover
        border-customBlack 
        ${selected ? 'text-customWhite translate-y-[2px] bg-customYellowHover' : 'bg-customYellow'}
        shadow-md border-b-[3px]
        transform active:translate-y-[2px]  
        rounded p-3 text-md font-semibold`
      }
    >
      {title}
    </button>
  )
};

export default AlgorithmBtn;