import React, { useContext, useEffect, useState } from "react";
import CustomSlider from "../sliders/slider";
import { Switch } from '@chakra-ui/react'
import { brushSizeOptions } from "@/lib/configs";

const BrushController = ({ setBrushSize, setBrushMode, brushMode }) => {
  const [brushSizeValue, setBrushSizeValue] = useState(3)

  const handleSpeedChange = (value) => {
    setBrushSizeValue(value);
    const newSize = brushSizeOptions.find(opt => opt.label === value).value
    setBrushSize(newSize)
  }

  const onSwitchChange = (val) => {
    if(val.target.checked){
      setBrushMode(1)
    } else {
      setBrushMode(-1)
    }
  }

  return (
    <>
      <CustomSlider 
        defaultValue={3} 
        min={1} 
        max={5} 
        step={1} 
        handleChange={handleSpeedChange}
        value={brushSizeValue}
      />
      <div className="flex text-customWhite">
        <p className="pr-10">Brush mode</p>
        <p className="pr-6 text-xl">-</p>
        <Switch 
          sx={{ '.chakra-switch__track': { bg: 'rgb(203,213,224)' } }} 
          size='lg' 
          onChange={onSwitchChange}
          isChecked={brushMode === 1 ? true : false}
        />
        <p className="pl-6 text-xl">+</p>
      </div>
    </>
  )
}

export default BrushController;