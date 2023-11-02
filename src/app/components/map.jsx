"use client";
import React, { useMemo, useState, useCallback, memo, useEffect } from "react";
import styles from "../styles/map.module.css";
import Node from "../components/node";

const Map = ({
  tool,
  result: { path, visitedNodes },
  mapData,
  mapSize,
  start,
  target,
  setMapData,
  setStart,
  setTarget,
  animationSpeed
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const gridStyle = useMemo(
    () => ({
      gridTemplateRows: `repeat(${mapSize.y}, 1fr)`,
      gridTemplateColumns: `repeat(${mapSize.x}, 1fr)`,
    }),
    [mapSize]
  );

  const animatePath = (withVisited, delay) => {
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

    setTimeout(() => {
      setMapData(updatedMapData)
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
        animatePath(updatedMapData, lastVisitedNode * animationSpeed * 1000)
      }
    }, [visitedNodes, path, setMapData]
  )

  useEffect(() => {
    animateVisitedNodes();
  }, [visitedNodes])

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
          if (node.state !== "target" && start === null) {
            setStart(index);
            setState = true;
          }
          break;
        case "target":
          if (node.state !== "start" && target === null) {
            setTarget(index);
            setState = true;
          }
          break;
        case "wall":
          if (node.state !== "start" && node.state !== "target") {
            setState = true;
          }
      }

      if (setState) {
        const copy = [...mapData];
        copy[index].state = tool;
        setMapData(copy);
      }
    },
    [tool, mapData]
  );

  useEffect(() => {
    const mapElement = document.getElementById("map");
    mapElement?.addEventListener("mousedown", () => setIsMouseDown(true));
    mapElement?.addEventListener("mouseup", () => setIsMouseDown(false));
  }, [])


  const nonMutableNodes = ["start", "target", "wall"];

  return (
    <div id="map" className={styles.main} style={gridStyle}>
      {mapData.map((cell, i) => {

        return (
          <Node
            i={i}
            delay={cell.animationDelay}
            speed={animationSpeed}
            cellState={cell.state}
            onClick={() => handleNodeAction(cell, i)}
            onMouseLeave={() =>
              isMouseDown ? handleNodeAction(cell, i) : null
            }
          />
        );
      })}
    </div>
  );
};

export default memo(Map);
