import React from "react";

const AlgorithmBtn = ({ onClick, title, selected, icon }) => {
  return(
    <button 
      onClick={onClick} 
      className={
        `flex gap-8 transition duration-200 ease-in-out 
        hover:bg-customYellowHover
        border-customBlack 
        ${selected ? 'text-customWhite translate-y-[2px] bg-customYellowHover' : 'bg-customYellow'}
        shadow-md border-b-[3px]
        transform active:translate-y-[2px]  
        rounded-xl p-4 text-md font-semibold`
      }
    >
      {icon}
      {title}
    </button>
  )
};

export default AlgorithmBtn;