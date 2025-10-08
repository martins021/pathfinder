"use client"
import SizeController from "./sizeController";
import AlgorithmSelect from "../dropdowns/algorithms";
import SpeedController from "./speedController";
import BrushController from "./brushController";
import LaunchBtn from "../buttons/launchBtn";
import ToolMenu from "./algorithmMenu";
import { Title } from "../atoms/title";

const Controls = ({ 
  dispatch,
  tool, 
  createMap, 
  clearPath,
  brushMode,
  launchAlgorithm,
  algorithm,
}) => {

  return (
    <div className="flex flex-col gap-6 mt-6">
      <LaunchBtn onClick={launchAlgorithm} />

      <Title text="Map Controls" />
      <div
        className="flex flex-col gap-8 mb-4 mt-4"
      >
        <SpeedController onChange={dispatch} />
        <SizeController 
          onChange={dispatch} 
        />
        {tool === "terrain" && 
        <BrushController 
          onChange={dispatch}
          brushMode={brushMode}
        />}
      </div>

      <div className="flex justify-between flex-row gap-2">
        <button 
          onClick={clearPath}
          className="rounded p-2 pl-7 pr-7 text-md font-semibold bg-customWhite hover:bg-customHoverGray w-full"
        >
          Clear path
        </button>
        <button 
          onClick={createMap}
          className="rounded p-2 pl-7 pr-7 text-md font-semibold bg-customWhite hover:bg-customHoverGray w-full"
        >
          Reset map
        </button>
      </div>

      <AlgorithmSelect 
        onChange={dispatch} 
        algorithm={algorithm} 
      />

      <ToolMenu 
        onChange={dispatch} 
        tool={tool} 
      />
    </div>
  );
}

export default Controls;