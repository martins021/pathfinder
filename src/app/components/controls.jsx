"use client"
import React, { useContext, useEffect, useState } from "react";
import MapContext from "../context/mapContext";

const Controls = () => {
  const { mapSize, setMapSize } = useContext(MapContext)
  const [x, setX] = useState(mapSize.x)
  const [y, setY] = useState(mapSize.y)
  const [adjustX, setAdjustX] = useState(false)

  const handleXChange = (event) => {
    let val = parseInt(event.target.value);
    console.log(val);
    if(val < 10) val = 10;
    else if(val > 100) val = 100;
    setX(val)
    setAdjustX(false)
  }
  
  const handleYChange = (event) => {
    let val = parseInt(event.target.value);
    console.log(val);
    if(val < 10) val = 10;
    else if(val > 100) val = 100;
    setY(val)
    setAdjustX(true)
  }

  useEffect(() => {
    if(adjustX){ // adjust one to maintain 16:9 ratio
      setMapSize({ x: Math.round((16 / 9) * y), y }) 
      setX(Math.round((16 / 9) * y))
    } else {
      setMapSize({ x, y: Math.round((9 / 16) * x) })
      setY(Math.round((9 / 16) * x))
    }
  }, [x, y])

  return (
    <div>
      <input
        type="number"
        value={x}
        onChange={handleXChange}
        min="0"
        max="100"
        step="5"
        disabled={y === 100}
      />
      <input
        type="number"
        value={y}
        onChange={handleYChange}
        min="0"
        max="100"
        step="5"
        disabled={x === 100}
      />
    </div>
  );
}

export default Controls;