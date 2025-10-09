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

const Node = ({ i, prevCellState, cellState, delay, onClick, onMouseLeave, elevation }) => {
  delay = delay ? delay : i / 1000;
  return (
    <div
      className={createClassname(cellState, prevCellState)}
      onClick={onClick}
      onMouseLeave={onMouseLeave}
      style={{ 
        "--delay": `${delay}s`, 
        "--animationFinalBackgroundColor": createAnimationTerrainColor(elevationColors[elevation + 100]),
        "--animationInitialBackgroundColor": elevationColors[elevation + 100],
        backgroundColor: "rgb(53, 53, 53)",
        "--baseBackgroundColor": cellState === "wall" ? "rgb(53, 53, 53)" : elevationColors[elevation + 100],
        fontSize: 12
      }}
      data-testid="map-node"
    >{i}</div>
  )
};

export default memo(Node);
