"use client"
import React, { useMemo, useCallback, useContext, memo } from "react";
import styles from "../styles/map.module.css"

const Cell = memo(({ cellState, onClick }) => {
  const cl = `${styles["cell"]} ${styles[cellState]}`;
  return <div className={cl} onClick={onClick}></div>;
});

const arePropsEqual = (prevProps, newProps) => {
  return prevProps.path === newProps.path
}

const Map = ({ tool, path, mapData, mapSize, start, target, setMapData, setStart, setTarget }) => {
  const gridStyle = useMemo(() => ({
    gridTemplateRows: `repeat(${mapSize.y}, 1fr)`,
    gridTemplateColumns: `repeat(${mapSize.x}, 1fr)`
  }), [mapSize]);
  
  const handleCellClick = (cell, index) => {
    let setState = false;
    switch (tool) {
      case "empty":
        if(cell.state === "start") {
          setStart(null);
        } else if(cell.state === "target") {
          setTarget(null);
        }
        setState = true;
        break;
      case "start":
        if(cell.state !== "target" && start === null){
          setStart(index);
          setState = true;
        }
        break;
      case "target":
        if(cell.state !== "start" && target === null){
          setTarget(index);
          setState = true;
        }
        break;
      case "wall":
        if(cell.state !== "start" && cell.state !== "target"){
          setState = true;
        }
    }

    if(setState){
      const copy = [...mapData];
      copy[index].state = tool;
      setMapData(copy);
    }
  }

  console.log("Map received new path: ", path);

  return (
    <div className={styles.main} style={gridStyle}>
      {mapData.map((cell, i) => {
        console.log(i);
        return(
          <Cell key={i} cellState={cell.state} onClick={() => handleCellClick(cell, i)} />
        )
      })}
    </div>
  );
};

export default memo(Map);