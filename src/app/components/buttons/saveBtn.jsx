"use client"
import React, { useContext, memo } from "react";


const SaveBtn = ({ onClick }) => {
  return(
    <button onClick={onClick} className="bg-customBlue text-customWhite font-bold py-2 px-4 rounded-full">
      Save
    </button>
  )
};

export default SaveBtn;