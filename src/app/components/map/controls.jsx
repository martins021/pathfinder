"use client"
import React, { useState } from "react";
import SizeController from "./sizeController";
import ToolsSelect from "../dropdowns/tools";
import { toolOptions } from "@/lib/configs";
import SpeedController from "./speedController";
import BrushController from "./brushController";

const Controls = ({ 
  tool, 
  setTool, 
  mapSize, 
  setMapSize, 
  createMap, 
  clearPath,
  setAnimationSpeed,
  setBrushSize,
  setBrushMode,
  brushMode,
  animationInProgress
}) => {

  return (
    <div className="flex flex-col justify-center gap-6">
      <SpeedController 
        setAnimationSpeed={setAnimationSpeed}
        animationInProgress={animationInProgress}
      />
      <SizeController 
          mapSize={mapSize}
          setMapSize={setMapSize}
      />
      {tool === "terrain" && <BrushController 
        setBrushSize={setBrushSize}
        setBrushMode={setBrushMode}
        brushMode={brushMode}
      />}
      <ToolsSelect 
        tool={tool}
        setTool={setTool}
        toolOptions={toolOptions}
      />
      <div className="flex justify-between flex-row gap-2 -mt-4">
        <button 
          onClick={clearPath}
          className="rounded p-2 pl-7 pr-7 text-md font-semibold bg-customWhite hover:bg-customHoverGray"
        >
          Clear path
        </button>
        <button 
          onClick={createMap}
          className="rounded p-2 pl-7 pr-7 text-md font-semibold bg-customWhite hover:bg-customHoverGray"
        >
          Reset map
        </button>
      </div>
    </div>
  );
}

export default Controls;