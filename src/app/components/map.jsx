"use client"
import React, { useContext, memo } from "react";
import styles from "../styles/map.module.css"
import MapContext from "@/app/context/mapContext";

const Cell = memo(({ cellState, onClick }) => {
  const cl = `${styles["cell"]} ${styles[cellState]}`;
  return <div className={cl} onClick={onClick}></div>;
});

const Map = ({ tool }) => {
  const { mapData, mapSize, setMapData, setStart, setTarget } = useContext(MapContext);

  const handleCellClick = (cell, index) => {
    if(tool === "start") setStart(index);
    else if(tool === "target") setTarget(index);
    
    const cp = [...mapData];
    cp[index].state = tool;
    setMapData(cp);
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