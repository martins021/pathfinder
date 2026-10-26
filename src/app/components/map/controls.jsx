"use client"
import AlgorithmSelect from "../dropdowns/algorithms";
import ToolMenu from "./algorithmMenu";
import styles from "../../styles/map.module.css";
import { FaTrash, FaBroom, FaShareNodes } from "react-icons/fa6";

const Controls = ({ 
  dispatch,
  tool, 
  resetNodes,
  createMap, 
  brushMode,
  algorithm,
  result,
  animationStep,
  totalNodes,
  onShare
}) => {
  const visitedCount = Math.min(animationStep, result.visitedNodes?.length ?? 0);
  const pathCount = Math.max(0, Math.min(result.path?.length ?? 0, animationStep - (result.visitedNodes?.length ?? 0)));

  return (
    <>
      <div className={styles.mainControls} style={{ gap: "1em" }}>
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
        <section className={styles.results} aria-label="Search results">
          <h2 className="font-semibold">Search results</h2>
          <dl className={styles.metrics}>
            <div>
              <dt>Visited nodes</dt>
              <dd>{animationStep > 0 ? visitedCount : "—"}</dd>
            </div>
            <div>
              <dt>Coverage</dt>
              <dd>{animationStep > 0 && totalNodes ? `${(visitedCount / totalNodes * 100).toFixed(1)}%` : "—"}</dd>
            </div>
            <div>
              <dt>Path length</dt>
              <dd>{result.targetFound && pathCount > 0 ? `${pathCount - 1} steps` : "—"}</dd>
            </div>
            <div>
              <dt>Path cost</dt>
              <dd>{result.targetFound && pathCount > 0 ? result.pathCosts?.[pathCount - 1]?.toLocaleString("en-US", { maximumFractionDigits: 3 }) ?? "—" : "—"}</dd>
            </div>
          </dl>
          {result.targetFound === false && animationStep >= result.visitedNodes.length && <p>No route found</p>}
        </section>
        <button
          type="button"
          onClick={onShare}
          className="rounded flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold bg-customWhite hover:bg-customHoverGray"
        >
          <FaShareNodes /> Share map
        </button>
      </div>

      <div className={styles[`${result.path?.length ? "resultControlsActive" : "resultControlsHidden"}`]}>
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
    </>
  );
}

export default Controls;
