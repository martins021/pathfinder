"use client"
import AlgorithmSelect from "../dropdowns/algorithms";
import LaunchBtn from "../buttons/launchBtn";
import ToolMenu from "./algorithmMenu";
import styles from "../../styles/map.module.css";

const Controls = ({ 
  searching,
  dispatch,
  tool, 
  resetNodes,
  createMap, 
  brushMode,
  launchAlgorithm,
  algorithm,
  result
}) => {

  return (
    <div className={styles.mainControls}>
      <LaunchBtn
        searching={searching} 
        onClick={launchAlgorithm} 
      />

      {/* <div style={{ color: "white" }}>
        <div className="flex flex-col">
          <p>Visited nodes: {result.visitedNodes?.length}</p>
          <p>Path length: {result.path?.length}</p>
          <p>Visited precentage: {result.precentageVisited?.toFixed(2)}%</p>
        </div>
      </div> */}


      <div className="flex justify-between flex-row gap-2">
        <button 
          onClick={() => resetNodes(["path"])}
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
        brushMode={brushMode}
      />
    </div>
  );
}

export default Controls;