import React, { useContext, useEffect, useState } from "react";
import { animationSpeedOptions } from "@/lib/configs";
import CustomSlider from "../sliders/slider";

const SpeedController = ({ initialAnimationSpeed, setAnimationSpeed, animationInProgress }) => {
  const speedLabel = animationSpeedOptions.find(opt => opt.value === initialAnimationSpeed).label
  const [speedValue, setSpeedValue] = useState(speedLabel)

  const handleSpeedChange = (value) => {
    setSpeedValue(value);
    const newSpeed = animationSpeedOptions.find(opt => opt.label === value).value
    setAnimationSpeed(newSpeed)
  }

  return (
    <div className="grid grid-cols-5" style={{ width: "100%" }}>
      <p className="col-span-1 text-customWhite text-sm text-center mr-2">Speed</p>
      <div className="col-span-4">
        <CustomSlider 
          disabled={animationInProgress}
          defaultValue={speedLabel} 
          min={1} 
          max={5} 
          step={1} 
          handleChange={handleSpeedChange}
          value={speedValue}
        />
      </div>
    </div>
  )
}

export default SpeedController;