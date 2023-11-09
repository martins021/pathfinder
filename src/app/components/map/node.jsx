"use client";
import React, { memo } from "react";
import styles from "../../styles/map.module.css";

const Node = ({ i, cellState, delay, speed, onClick, onMouseLeave }) => (
  <div
    className={`${styles["cell"]} ${styles[cellState]}`}
    onClick={onClick}
    onMouseLeave={onMouseLeave}
    style={{ "--delay": delay ? `${delay * speed}s` : `0s` }}
  ></div>
);

export default memo(Node);
