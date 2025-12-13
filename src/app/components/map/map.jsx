"use client";
import React, { useMemo, useState, useCallback, memo, useEffect } from "react";
import styles from "../../styles/map.module.css";
import Node from "./node";
import TimeLine from "../sliders/timeline";

const Map = ({
  handleNodeAction,
  result: { path, visitedNodes },
  mapData,
  gridStyle,
  setMapData,
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const nodesToAnimate = useMemo(() => {
    if(!visitedNodes || !path) return [];
    const result = [];
    visitedNodes.map(node => result.push({ animationType: 'visited', node }));
    path.map(node => result.push({ animationType: 'path', node }));
    return result;
  }, [visitedNodes, path]);

  useEffect(() => {
    const mapElement = document.getElementById("map");
    mapElement?.addEventListener("mousedown", () => setIsMouseDown(true));
    mapElement?.addEventListener("mouseup", () => setIsMouseDown(false));
  }, [])

  const animateNode = (step, prevStep) => {
    if(!nodesToAnimate) return;

    const mapDataCopy = [...mapData]
    const fwd = step >= prevStep;
    const sliceOfNodesToAnimate = fwd 
      ? nodesToAnimate.slice(prevStep, step + 1)
      : nodesToAnimate.slice(step, prevStep + 1)

    sliceOfNodesToAnimate?.map(({ node, animationType }) => {
      const nodeToModify = mapDataCopy[node];
      if(!nodeToModify || nonMutableNodes.includes(nodeToModify.state)) return;
      nodeToModify.prevState = nodeToModify.state;
      nodeToModify.state = fwd ? animationType : "empty"
      setMapData(mapDataCopy);      
    })
  }

  const nonMutableNodes = ["start", "target", "wall"];

  return (
    <>
      <div id="map" data-testid="map-grid" className={styles.main} style={gridStyle}>
        {mapData.map((cell, i) => {
          return (
            <Node
              key={i}
              i={i}
              prevCellState={cell.prevState}
              cellState={cell.state}
              onClick={() => handleNodeAction(cell, i)}
              onMouseLeave={() =>
                (isMouseDown) ? handleNodeAction(cell, i) : null
              }
              elevation={cell.elev}
            />
          );
        })}
      </div>
      <div className={styles.mainTimeline}>
        <TimeLine 
          disabled={nodesToAnimate.length === 0}
          duration={nodesToAnimate.length}
          onChange={animateNode}
        />
      </div>
    </>
  );
};

export default memo(Map);
