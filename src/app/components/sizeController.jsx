import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/sizeController.module.css"

const SizeController = ({ mapSize, setMapSize }) => {
  const [x, setX] = useState(mapSize.x)
  const [y, setY] = useState(mapSize.y)

  const handleXChange = (event) => {
    let valX = parseInt(event.target.value);
    let valY = Math.round((9 / 16) * valX); // adjust one to maintain 16:9 ratio

    if(valY < 10 || valX < 10 || valX > 100) return; // don't change size if invalid values
    setX(valX)
    setY(valY)
  }
  
  const handleYChange = (event) => {
    let valY = parseInt(event.target.value);
    let valX = Math.round((16 / 9) * valY); // adjust one to maintain 16:9 ratio
    
    if(valX > 100 || valY < 10 || valY > 100) return; // don't change size if invalid values
    setY(valY)
    setX(valX)
  }

  useEffect(() => {
    setMapSize({ x, y })
  }, [x, y])

  return (
    <>
      <div className={styles.container}>
        <input
          className={styles.input}
          type="number"
          value={x}
          onChange={handleXChange}
          min="0"
          max="100"
          step="5"
          disabled={y === 100}
        />
        <input
          className={styles.input}
          type="number"
          value={y}
          onChange={handleYChange}
          min="0"
          max="100"
          step="5"
          disabled={x === 100}
        />
      </div>
    </>
  );
}

export default SizeController;