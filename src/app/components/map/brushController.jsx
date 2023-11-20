import React, { useContext, useEffect, useState } from "react";
import CustomSlider from "../sliders/slider";
import { brushSizeOptions } from "@/lib/configs";

const BrushSizeController = ({ setBrushSize }) => {
  const [brushSizeValue, setBrushSizeValue] = useState(3)

  const handleSpeedChange = (value) => {
    setBrushSizeValue(value);
    const newSize = brushSizeOptions.find(opt => opt.label === value).value
    setBrushSize(newSize)
  }

  return (
    <CustomSlider 
      defaultValue={3} 
      min={1} 
      max={5} 
      step={1} 
      handleChange={handleSpeedChange}
      value={brushSizeValue}
    />
  )
}

export default BrushSizeController;