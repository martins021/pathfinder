"use client"
import React, { useContext, memo } from "react";
import styles from "../styles/map.module.css"
import MapContext from "@/app/context/mapContext";

const Cell = memo(({ cellState, onClick }) => {
  const cl = `${styles["cell"]} ${styles[cellState]}`;
  return <div className={cl} onClick={onClick}></div>;
});

const Map = ({ tool }) => {
  const { mapData, mapSize, start, target, setMapData, setStart, setTarget } = useContext(MapContext);

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

  return (
    <div className={styles.main} style={{
      gridTemplateRows: `repeat(${mapSize.y}, 1fr)`,
      gridTemplateColumns: `repeat(${mapSize.x}, 1fr)`
    }}>
      {mapData.map((cell, i) => (
        <Cell key={i} cellState={cell.state} onClick={() => handleCellClick(cell, i)} />
      ))}
    </div>
  );
};

export default Map;