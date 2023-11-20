"use client"
import React, { useState } from "react";
import SizeController from "./sizeController";
import ToolsSelect from "../dropdowns/tools";
import { toolOptions } from "@/lib/configs";
import SpeedController from "./speedController";

const Controls = ({ 
  tool, 
  setTool, 
  mapSize, 
  setMapSize, 
  createMap, 
  mapData, 
  setMapData,
  setAnimationSpeed
}) => {

  const handleResetMap = () => {
    createMap();
  }

  const handleClearPath = () => {
    const withoutPath = mapData.map(node => {
      if(node.state === 'visited' || node.state === 'path'){
        return ({
          ...node, 
          state: 'empty'
        });
      } 
      return node;
    })

    setMapData(withoutPath);
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <SpeedController 
        setAnimationSpeed={setAnimationSpeed}
      />
      <SizeController 
          mapSize={mapSize}
          setMapSize={setMapSize}
      />
      <ToolsSelect 
        tool={tool}
        setTool={setTool}
        toolOptions={toolOptions}
      />
      <div className="flex flex-row gap-2">
        <button 
          onClick={handleClearPath}
          className="rounded p-3 text-md font-semibold bg-customWhite hover:bg-customHoverGray"
        >
          Clear path
        </button>
        <button 
          onClick={handleResetMap}
          className="rounded p-3 text-md font-semibold bg-customWhite hover:bg-customHoverGray"
        >
          Reset map
        </button>
      </div>
    </div>
  );
}

export default Controls;