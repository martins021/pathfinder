"use client"
import AlgorithmSelect from "../dropdowns/algorithms";
import LaunchBtn from "../buttons/launchBtn";
import ToolMenu from "./algorithmMenu";
import styles from "../../styles/map.module.css";

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
    <div className={styles.mainControls}>
      <LaunchBtn onClick={launchAlgorithm} />

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
        brushMode={brushMode}
      />
    </div>
  );
}

export default Controls;