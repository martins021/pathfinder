import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/sizeController.module.css"
import { sizeOptions } from "@/lib/configs";
import CustomSlider from "../sliders/slider";

const SizeController = ({ initialMapSize, mapSize, setMapSize }) => {
  const sizeLabel = sizeOptions.find(opt => opt.value === initialMapSize.x).label
  const [sizeValue, setSizeValue] = useState(sizeLabel)
  const [x, setX] = useState(mapSize.x)
  const [y, setY] = useState(mapSize.y)

  const handleSizeChange = (val) => {
    setSizeValue(val);
    let valX = sizeOptions.find(opt => opt.label === val).value
    let valY = Math.round((9 / 16) * valX); // adjust one to maintain 16:9 ratio

    if(valY < 10 || valX < 10 || valX > 100) return; // don't change size if invalid values
    setX(valX)
    setY(valY)
  }
  
  useEffect(() => {
    setMapSize({ x, y })
  }, [x, y])

  return (
    <>
      <div className="grid grid-cols-5" style={{ width: "100%" }}>
        <p className="col-span-1 text-customWhite text-sm text-center mr-2">Size</p>
        <div className="col-span-4">
          <CustomSlider 
            defaultValue={sizeLabel} 
            min={1} 
            max={9} 
            step={1} 
            handleChange={handleSizeChange}   
            value={sizeValue}     
          />
        </div>
      </div>
    </>
  );
}

export default SizeController;