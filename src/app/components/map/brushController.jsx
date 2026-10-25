import React, { useState } from "react";
import CustomSlider from "../sliders/slider";
import { Switch } from '@chakra-ui/react'

const BrushController = ({ onChange, brushMode, tool }) => {
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
      <div className="grid grid-cols-5 items-center" style={{ width: "95%" }}>
        <p className="col-span-2 text-customWhite text-sm whitespace-nowrap mr-2">Brush size</p>
        <div className="col-span-3">
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
      {tool === "terrain" && <div className="grid grid-cols-5 items-center" style={{ width: "95%" }}>
        <p className="col-span-2 text-customWhite text-sm whitespace-nowrap mr-2">Brush mode</p>
        <div className="col-span-3 flex items-center gap-3 text-customWhite">
          <p>-</p>
          <Switch 
            sx={{ '.chakra-switch__track': { bg: 'rgb(144, 122, 0)' } }} 
            size='md'
            onChange={onSwitchChange}
            isChecked={brushMode === 1 ? true : false}
          />
          <p>+</p>
        </div>
      </div>}
    </>
  )
}

export default BrushController;
