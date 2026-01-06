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

const Node = React.memo(({ i, cellState, elevation }) => {
  // console.log(i);
  const bckGroundColor = baseColors.get(cellState) || elevationColors[elevation];
  return (
    <div
      data-idx={i}
      className={`${styles["cell"]} ${styles[cellState]}`}
      style={{ 
        backgroundColor: "rgb(53, 53, 53)", // pre-animation color
        "--delay": `${i / 1000}s`, 
        "--baseBackgroundColor": bckGroundColor,
        "--animationFinalBackgroundColor": createAnimationTerrainColor(elevationColors[elevation]),
        "--animationInitialBackgroundColor": elevationColors[elevation],
      }}
    ></div>
  )
});

export default Node;