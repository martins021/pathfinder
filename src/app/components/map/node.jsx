"use client";
import React, { memo } from "react";
import styles from "../../styles/map.module.css";
import { elevationColors } from "@/lib/configs";

const baseColors = new Map([
  ["wall", "rgb(53, 53, 53)"],
  ["start", "rgb(60, 110, 113)"],
  ["target", "rgb(164, 22, 26)"],
])

const createAnimationTerrainColor = (color) => {
  return color.replace('rgb', 'rgba').replace(')', `, 0.5)`);
}

const Node = ({ i, prevCellState, cellState, onClick, onMouseLeave, elevation }) => {
  const bckGroundColor = baseColors.get(cellState) || elevationColors[elevation + 100];
  return (
    <div
      className={`${styles["cell"]} ${styles[cellState]}`}
      onClick={onClick}
      onMouseLeave={onMouseLeave}
      style={{ 
        backgroundColor: "rgb(53, 53, 53)", // pre-animation color
        "--delay": `${i / 1000}s`, 
        "--baseBackgroundColor": bckGroundColor,
        "--animationFinalBackgroundColor": createAnimationTerrainColor(elevationColors[elevation + 100]),
        "--animationInitialBackgroundColor": elevationColors[elevation + 100],
      }}
      data-testid="map-node"
    ></div>
  )
};

export default memo(Node);
