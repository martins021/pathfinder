"use client";
import React, { memo } from "react";
import styles from "../../styles/map.module.css";
import { elevationColors } from "@/lib/configs";

const getBackgroundColor = (cellState, elevation) => {
  if (cellState === "terrain"){
    return elevationColors[elevation + 100];
  }
  return "";
}

const Node = ({ i, cellState, delay, speed, onClick, onMouseLeave, elevation }) => (
  <div
    className={`${styles["cell"]} ${styles[cellState]}`}
    onClick={onClick}
    onMouseLeave={onMouseLeave}
    style={{ 
      "--delay": delay ? `${delay * speed}s` : `0s`, 
      backgroundColor: getBackgroundColor(cellState, elevation)
    }}
  ></div>
);

export default memo(Node);
