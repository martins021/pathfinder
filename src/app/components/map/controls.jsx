"use client"
import AlgorithmSelect from "../dropdowns/algorithms";
import ToolMenu from "./algorithmMenu";
import styles from "../../styles/map.module.css";
import { FaTrash, FaBroom } from "react-icons/fa6";

const Controls = ({ 
  dispatch,
  tool, 
  resetNodes,
  createMap, 
  brushMode,
  algorithm,
  result
}) => {

  return (
    <div className={styles.mainControls}>
      <div style={{ display: "flex", gap: "1em", flexDirection: "column" }}>
        <AlgorithmSelect 
          onChange={dispatch} 
          algorithm={algorithm} 
        />
        <ToolMenu 
          onChange={dispatch}
          algorithm={algorithm} 
          tool={tool} 
          brushMode={brushMode}
        />
      </div>

      <div className={styles[`${result.path?.length ? "resultControlsActive" : "resultControlsHidden"}`]}>
        {/* <div className={styles.results}>
          <p className="font-bold">Results:</p>
          <p>Visited nodes: {result.visitedNodes?.length}</p>
          <p>Path length: {result.path?.length}</p>
          <p>Visited precentage: {result.precentageVisited?.toFixed(2)}%</p>
        </div> */}
        <div className="flex flex-row gap-2">
          <button 
            onClick={() => resetNodes(["visited", "path"])}
            className="rounded flex items-center gap-2 px-3 py-2 text-sm font-semibold bg-customWhite hover:bg-customHoverGray w-full"
          >
            <FaBroom /> Clear visited
          </button>
          <button 
            onClick={createMap}
            className="rounded flex items-center gap-2 px-3 py-2 text-sm font-semibold bg-customWhite hover:bg-customHoverGray w-full"
          >
            <FaTrash /> Reset map
          </button>
        </div>
      </div>
    </div>
  );
}

export default Controls;
