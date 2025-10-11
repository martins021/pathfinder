"use client";
import React, { useMemo, useState, useCallback, memo, useEffect } from "react";
import styles from "../../styles/map.module.css";
import Node from "./node";
import { TimeLine } from "../sliders/timeline";

const Map = ({
  tool,
  result: { path, visitedNodes },
  mapData,
  size,
  setMapData,
  setStart,
  setTarget,
  brushSize,
  brushMode,
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const nodesToAnimate = useMemo(() => {
    if(!visitedNodes || !path) return [];
    const result = [];
    visitedNodes.map(node => result.push({ animationType: 'visited', node }));
    path.map(node => result.push({ animationType: 'path', node }));
    return result;
  }, [visitedNodes, path]);

  const MIN_ELEVATION = -100
  const MAX_ELEVATION = 99

  const gridStyle = useMemo(() => ({
    gridTemplateRows: `repeat(${size.y}, 1fr)`,
    gridTemplateColumns: `repeat(${size.x}, 1fr)`,
  }), [size]);

  const handleSetTerrain = (index) => {
    const mapSizeX = size.x; // horizontal map size
    const mapSizeY = size.y; // vertical map size
    const squareBrushSize = brushSize * 2 - 1;

    const brushNodes = [] // 2d array containing all nodes in brush area
    for (let s = brushSize; s >= -Math.abs(brushSize - 2); s--) {
      const brushRowStart = index - (s - 1) * mapSizeX - (brushSize -1); // start node of each row within brush area
      // create array containing brush nodes from this row
      const subArray = Array.from(
        { length: squareBrushSize }, 
        (_, index) => brushRowStart + index
      ); 
      brushNodes.push(subArray);
    }

    const mainNodeCoords = Math.floor(squareBrushSize / 2); // coordinates within the brush area of the clicked node
    for (let i = 0; i < brushNodes.length; i++) {
      // get row id of the middle element of the current brush area row
      const middleElementRow = brushNodes[i][Math.floor(brushNodes[i].length / 2)] / mapSizeX | 0 // bitwise or operator for integer division
      for (let j = 0; j < brushNodes[i].length; j++) {
        // distance from the clicked node to other nodes in brush area
        const distance = Math.sqrt(Math.pow((mainNodeCoords - i), 2) + Math.pow((mainNodeCoords - j), 2)); 
        if(distance <= brushSize - 1){ // brush will only affect these nodes
          const distanceFloored = Math.floor(distance);
          const elevToAdd = brushSize - distanceFloored;
          const affectedNodeIndex = brushNodes[i][j];

          // check if node affected by brush is within map borders and all left and right neighbors are in the same row
          if(affectedNodeIndex >= 0 && affectedNodeIndex < mapSizeX * mapSizeY && (affectedNodeIndex / mapSizeX | 0) === middleElementRow){
            const mapDataCopy = [...mapData];
            const newNodeWeight = mapDataCopy[affectedNodeIndex].elev + (elevToAdd * brushMode)
            if(newNodeWeight <= MAX_ELEVATION && newNodeWeight >= MIN_ELEVATION){
              mapDataCopy[affectedNodeIndex].elev = newNodeWeight
              setMapData(mapDataCopy);  
            }
          }
        }
      }
    }
  }

  const handleNodeAction = useCallback(
    (node, index) => {
      let setState = false;
      switch (tool) {
        case "empty":
          if (node.state === "start") {
            setStart(null);
          } else if (node.state === "target") {
            setTarget(null);
          }
          setState = true;
          break;
        case "start":
          if (node.state !== "target" && node.state !== "wall") {
            mapData.map(node => node.state === "start" ? node.state = node.prevState : null)
            const mapDataCopy = [...mapData];
            mapDataCopy[index].prevState = mapDataCopy[index].state;
            mapDataCopy[index].state = tool;
            setMapData(mapDataCopy);      
            setStart(index);
          }
          break;
        case "target":
          if (node.state !== "start" && node.state !== "wall") {
            mapData.map(node => node.state === "target" ? node.state = node.prevState : null)
            const mapDataCopy = [...mapData];
            mapDataCopy[index].prevState = mapDataCopy[index].state;
            mapDataCopy[index].state = tool;
            setMapData(mapDataCopy);      
            setTarget(index);
          }
          break;
        case "wall":
          if (node.state !== "start" && node.state !== "target") {
            setState = true;
          }
          break;
        case "terrain":
          if(node.state === "empty" || node.state === "terrain" || node.state === "visited" || node.state === "path"){
            handleSetTerrain(index)
          }
          break;
      }

      if (setState) {
        const mapDataCopy = [...mapData];
        mapDataCopy[index].prevState = mapDataCopy[index].state;
        mapDataCopy[index].state = tool;
        setMapData(mapDataCopy);
      }
    },
    [tool, mapData, brushSize]
  );

  useEffect(() => {
    const mapElement = document.getElementById("map");
    mapElement?.addEventListener("mousedown", () => setIsMouseDown(true));
    mapElement?.addEventListener("mouseup", () => setIsMouseDown(false));
  }, [])

  const animateNode = (step, prevStep) => {
    // console.log("Animating node: ", nodeId, type)
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
              delay={cell.animationDelay}
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
          duration={nodesToAnimate.length}
          setMapData={setMapData}
          onChange={animateNode}
        />
      </div>
    </>
  );
};

export default memo(Map);
