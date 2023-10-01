"use client"
import React from "react";
import styles from "../app/styles/map.module.css"


const Map = () => {
      return (
        <div className={styles.main}>
            {Array.from({ length: 4000 }).map((_, index) => (
                <div key={index} className={styles.cell}></div>
            ))}
        </div>
      );
};

export default Map;