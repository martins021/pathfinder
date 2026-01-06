import React, { useState } from "react";
import CustomSlider from "../sliders/slider";

const DEFAULT = 3
const MULTIPLIER = 5

const SizeController = ({ onChange }) => {
  const [sizeValue, setSizeValue] = useState(DEFAULT);
  const handleSizeChange = (val) => {
    setSizeValue(val);
    onChange({ type: "size", value: val * MULTIPLIER + 20 })
  }

  return (
    <>
      <div className="grid grid-cols-5" style={{ width: "95%" }}>
        <p className="col-span-1 text-customWhite text-sm text-center mr-2">Node size</p>
        <div className="col-span-4">
          <CustomSlider 
            defaultValue={DEFAULT} 
            min={1} 
            max={5} 
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