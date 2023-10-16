"use client"
import React, { useContext, useEffect, useState } from "react";
import SizeController from "./sizeController";


const Controls = ({ tool, setTool }) => {
  return (
    <>
     <SizeController />
     <div style={{ display: "flex", justifyContent: "space-around" }}>
      <button onClick={() => setTool("start")} className="text-white bg-green rounded-lg text-sm p-2">Start</button>
      <button onClick={() => setTool("target")} className="text-white bg-red rounded-lg  text-sm p-2">Target</button>
      <button onClick={() => setTool("wall")} className="text-white bg-gray rounded-lg  text-sm p-2">Wall</button>
     </div>
    </>
  );
}

export default Controls;