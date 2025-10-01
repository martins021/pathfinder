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
  animationSpeed,
  brushSize,
  brushMode,
  setAnimate,
  animate,
  animationId
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const MIN_ELEVATION = -100
  const MAX_ELEVATION = 99

  const gridStyle = useMemo(() => ({
    gridTemplateRows: `repeat(${size.y}, 1fr)`,
    gridTemplateColumns: `repeat(${size.x}, 1fr)`,
  }), [size]);

  const animatePath = (withVisited, delay, originalAnimationId) => {
    const updatedMapData = withVisited.map((node, i) => {
      if (path?.includes(i) && !nonMutableNodes.includes(node.state)) {
        return ({
          ...node,
          state: "path",
          animationDelay: path.indexOf(i)
        })
      } 
      return node;
    })
    setAnimate(true)
    setTimeout(() => {
      if(animationId.current === originalAnimationId){
        setMapData(updatedMapData)
      }
      setAnimate(false)
    }, delay)
  }

  const animateVisitedNodes = useCallback(
    () => {
      if(mapData.length){
        const lastVisitedNode = visitedNodes?.length - 1;
        const updatedMapData = mapData.map((node, i) => {
          if (visitedNodes?.includes(i) && !nonMutableNodes.includes(node.state)) {
            return ({
              ...node,
              state: "visited",
              animationDelay: visitedNodes.indexOf(i)
            })
          }
          return node;
        })

        setMapData(updatedMapData);
        animatePath(updatedMapData, lastVisitedNode * animationSpeed * 1000, animationId.current)
      }
    }, [visitedNodes, path, setMapData, animationSpeed]
  )

  useEffect(() => {
    animateVisitedNodes();
  }, [visitedNodes])

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
              speed={animationSpeed}
              prevCellState={cell.prevState}
              cellState={cell.state}
              onClick={() => !animate ? handleNodeAction(cell, i) : null}
              onMouseLeave={() =>
                (isMouseDown && !animate) ? handleNodeAction(cell, i) : null
              }
              elevation={cell.elev}
            />
          );
        })}
      </div>
      <TimeLine 
        visitedNodes={visitedNodes}
        path={path}
      />
    </>
  );
};

export default memo(Map);
