import React, { useState } from "react";
import CustomSlider from "../sliders/slider";
import { Switch } from '@chakra-ui/react'

const BrushController = ({ onChange, brushMode }) => {
  const [brushSizeValue, setBrushSizeValue] = useState(3)

  const handleSpeedChange = (value) => {
    setBrushSizeValue(value);
    onChange({ type: "brushSize", value });
  }

  const onSwitchChange = (val) => {
    onChange({ type: "brushMode", value: val.target.checked ? 1 : -1 });
  }

  return (
    <>
      <div className="grid grid-cols-5" style={{ width: "100%" }}>
        <p className="col-span-1 text-customWhite text-sm text-center mr-2">Brush size</p>
        <div className="col-span-4">
          <CustomSlider 
            defaultValue={3} 
            min={1} 
            max={5} 
            step={1} 
            handleChange={handleSpeedChange}
            value={brushSizeValue}
          />
        </div>
      </div>
      <div className="grid grid-cols-5" style={{ width: "100%" }}>
        <p className="col-span-2 text-customWhite text-sm text-center mr-2">Brush mode</p>
        <div className="col-span-3 flex text-customWhite">
          <p className="pr-6 text-xl">-</p>
          <Switch 
            sx={{ '.chakra-switch__track': { bg: 'rgb(144, 122, 0)' } }} 
            size='lg' 
            onChange={onSwitchChange}
            isChecked={brushMode === 1 ? true : false}
          />
          <p className="pl-6 text-xl">+</p>
        </div>
      </div>
    </>
  )
}

export default BrushController;