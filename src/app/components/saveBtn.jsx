"use client"
import React, { useContext, memo } from "react";


const SaveBtn = ({ onClick }) => {
  return(
    <button onClick={onClick} className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
      Save
    </button>
  )
};

export default SaveBtn;