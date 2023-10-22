"use client"
import React, { useContext, useEffect, useState } from "react";
import SizeController from "./sizeController";


const Controls = ({ tool, setTool }) => {
  return (
    <>
     <SizeController />
     <div style={{ display: "flex", justifyContent: "space-around" }}>
      <button onClick={() => setTool("start")} className="text-customWhite bg-customGreen rounded-lg text-sm p-2">Start</button>
      <button onClick={() => setTool("target")} className="text-customWhite bg-customRed rounded-lg  text-sm p-2">Target</button>
      <button onClick={() => setTool("wall")} className="text-customWhite bg-customGray rounded-lg  text-sm p-2">Wall</button>
      <button onClick={() => setTool("empty")} className="rounded-lg  text-sm p-2">Clear</button>
     </div>
    </>
  );
}

export default Controls;