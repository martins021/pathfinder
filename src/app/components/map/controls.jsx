"use client"
import React, { useState } from "react";
import SizeController from "./sizeController";
import ToolsSelect from "../dropdowns/tools";
import Slider from "../sliders/slider";
import { toolOptions } from "@/lib/cofigs";

const speedOptions = ["Slowest", "Slow", "Normal", "Fast", "Fastest"]

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
  const [speedLabel, setSpeedLabel] = useState("Normal")

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

  const handleSpeedChange = (value) => {
    switch (value) {
      case "0":
        setAnimationSpeed(0.0768);
        setSpeedLabel("Slowest");
        break;
      case "25":
        setAnimationSpeed(0.048);
        setSpeedLabel("Slow");
        break;
      case "50":
        setAnimationSpeed(0.03);
        setSpeedLabel("Normal");
        break;
      case "75":
        setAnimationSpeed(0.012);
        setSpeedLabel("Fast");
        break;
      default:
        setAnimationSpeed(0.0048);
        setSpeedLabel("Fastest");
        break;
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="flex flex-row justify-between pl-16 pr-16" style={{ width: "100%" }}>
        <Slider
          options={speedOptions} 
          handleChange={handleSpeedChange}
        />
        <div className="text-customWhite">{speedLabel}</div>
      </div>
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