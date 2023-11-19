import React, { useContext, useEffect, useState } from "react";
import { animationSpeedOptions } from "@/lib/cofigs";
import CustomSlider from "../sliders/slider";

const SpeedController = ({ setAnimationSpeed }) => {
  const [speedValue, setSpeedValue] = useState(3)

  const handleSpeedChange = (value) => {
    setSpeedValue(value);
    const newSpeed = animationSpeedOptions.find(opt => opt.label === value).value
    setAnimationSpeed(newSpeed)
  }

  return (
    <CustomSlider 
      defaultValue={3} 
      min={1} 
      max={5} 
      step={1} 
      handleChange={handleSpeedChange}
      value={speedValue}
    />
  )
}

export default SpeedController;