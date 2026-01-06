"use client";
import React, { useMemo, useState, useCallback, memo, useEffect, useRef } from "react";
import styles from "../../styles/map.module.css";
import Node from "./node";
import TimeLine from "../sliders/timeline";

const Map = ({
  handleNodeAction,
  result: { path, visitedNodes },
  mapData,
  setMapData,
  gridStyle,
  launchAlgorithm,
  searching
}) => {
  const isDownRef = useRef(false);

  useEffect(() => {
    const onDown = (e) => {
      if (e.button === 0) isDownRef.current = true; // left button pressed
    };
    const onUp = () => isDownRef.current = false;
    const onBlur = () => isDownRef.current = false;

    document.addEventListener("pointerdown", onDown, true);
    document.addEventListener("pointerup", onUp, true);
    window.addEventListener("blur", onBlur);

    return () => {
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("pointerup", onUp, true);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

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
    })
    setMapData(mapDataCopy);      
  }

  const nonMutableNodes = ["start", "target", "wall"];

  const getNodeAndModify = (e) => {
    const el = e.target.closest("[data-idx]");
    if (!el) return;
    handleNodeAction(Number(el.dataset.idx));
  }

  return (
    <>
      <div 
        id="map" 
        className={styles.main} 
        style={gridStyle}
        onClick={e => getNodeAndModify(e)}
        onPointerOver={e => {
          if (!isDownRef.current) return;
          getNodeAndModify(e);
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
          duration={nodesToAnimate.length}
          onChange={animateNode}
          launchAlgorithm={launchAlgorithm}
          searching={searching}
        />
      </div>
    </>
  );
};

export default memo(Map);
