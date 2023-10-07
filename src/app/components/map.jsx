"use client"
import React, { useContext } from "react";
import styles from "../styles/map.module.css"
import MapContext from "@/app/context/mapContext";

const Map = () => {
  const { mapData, setMapData } = useContext(MapContext)

  return (
    <div className={styles.main}>
      {mapData.map((cell, i) => {
        const cl = `${styles["cell"]} ${styles[cell.state]}`
        return (
          <div key={i} className={cl}></div>
        )
      })}                 
    </div>                                                      
  );
};

export default Map;