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
  const nodesToAnimate = useMemo(() => {
    if(!visitedNodes || !path) return [];
    const result = [];
    visitedNodes.map(node => result.push({ animationType: 'visited', node }));
    path.map(node => result.push({ animationType: 'path', node }));
    return result;
  }, [visitedNodes, path]);

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
      <div 
        id="map" 
        data-testid="map-grid" 
        className={styles.main} 
        style={gridStyle}
        onMouseEnter={e => {
          if(e.nativeEvent.buttons !== 1) return;
          const el = e.target.closest("[data-idx]");
          if (!el) return;
          handleNodeAction(Number(el.dataset.idx));
        }}
      >
        {mapData.map((cell, i) => (
            <Node
              key={i}
              i={i}
              cellState={cell.state}
              elevation={cell.elev}
            />
        ))}
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
