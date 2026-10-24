"use client";
import React, { useMemo, useState, useCallback, memo, useEffect, useRef } from "react";
import styles from "../../styles/map.module.css";
import Node from "./node";
import TimeLine from "../sliders/timeline";

const nonMutableNodes = ["start", "target", "wall"];

const Map = ({
  handleNodeAction,
  result: { path, visitedNodes },
  mapData,
  setMapData,
  gridStyle,
  launchAlgorithm,
  searching,
  animationVersion
}) => {
  const isDownRef = useRef(false);
  const [speed, setSpeed] = useState(20);

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

  const animateNode = useCallback((step, prevStep) => {
    if(!nodesToAnimate) return;
    const fwd = step >= prevStep;
    const sliceOfNodesToAnimate = fwd 
      ? nodesToAnimate.slice(prevStep, step)
      : nodesToAnimate.slice(step, prevStep)
    
    setMapData(prev => {
      const mapDataCopy = [...prev]
      
      sliceOfNodesToAnimate?.map(({ node, animationType }) => {
        const nodeToModify = mapDataCopy[node];
        if(!nodeToModify || nonMutableNodes.includes(nodeToModify.state)) return;
        // Undoing a path step restores its earlier visited state, if present.
        const previousAnimation = !fwd && nodesToAnimate.slice(0, step).findLast(item => item.node === node);
        mapDataCopy[node] = {
          ...nodeToModify,
          prevState: nodeToModify.state,
          state: fwd ? animationType : previousAnimation?.animationType || "empty",
        };
      })

      return mapDataCopy
    });      
  }, [nodesToAnimate, setMapData])

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
        onPointerDown={e => {
          if (e.button !== 0) return;
          e.preventDefault(); // Drawing must not start native text selection or dragging.
          getNodeAndModify(e);
        }}
        onPointerOver={e => {
          if (!isDownRef.current) return;
          getNodeAndModify(e);
        }}
        onDragStart={e => e.preventDefault()}
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
          key={animationVersion}
          speed={speed}
          setSpeed={setSpeed}
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
