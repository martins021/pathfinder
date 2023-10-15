"use client"
import React, { useContext, memo } from "react";
import styles from "../styles/map.module.css"
import MapContext from "@/app/context/mapContext";

const Cell = memo(({ cellState }) => {
  const cl = `${styles["cell"]} ${styles[cellState]}`;
  return <div className={cl}></div>;
});

const Map = () => {
  const { mapData, mapSize } = useContext(MapContext);

  return (
    <div className={styles.main} style={{
      gridTemplateRows: `repeat(${mapSize.y}, 1fr)`,
      gridTemplateColumns: `repeat(${mapSize.x}, 1fr)`
    }}>
      {mapData.map((cell, i) => (
        <Cell key={i} cellState={cell.state} />
      ))}
    </div>
  );
};

export default Map;