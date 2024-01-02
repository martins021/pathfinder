"use client";
import React, { memo } from "react";
import styles from "../../styles/map.module.css";
import { elevationColors } from "@/lib/configs";

const createClassname = (cellState, prevCellState) => {
  let string = `${styles["cell"]}`;
  if (cellState === "start"){
    string += ` ${styles[prevCellState]} ${styles["start"]}`
  } else if (cellState === "target"){
    string += ` ${styles[prevCellState]} ${styles["target"]}`
  } else {
    string += ` ${styles[cellState]}`
  }
  return string;
}

const createAnimationTerrainColor = (color) => {
  return color.replace('rgb', 'rgba').replace(')', `, 0.5)`);
}

const Node = ({ i, prevCellState, cellState, delay, speed, onClick, onMouseLeave, elevation }) => (
  <div
    className={createClassname(cellState, prevCellState)}
    onClick={onClick}
    onMouseLeave={onMouseLeave}
    style={{ 
      "--delay": delay ? `${delay * speed}s` : `0s`, 
      "--animationFinalBackgroundColor": createAnimationTerrainColor(elevationColors[elevation + 100]),
      "--animationInitialBackgroundColor": elevationColors[elevation + 100],
      backgroundColor: cellState === "wall" ? "rgb(53, 53, 53)" : elevationColors[elevation + 100]
    }}
    data-testid="map-node"
  ></div>
);

export default memo(Node);
