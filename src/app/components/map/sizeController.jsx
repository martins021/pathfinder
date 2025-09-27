import React, { useState } from "react";
import CustomSlider from "../sliders/slider";

const DEFAULT = 3
const MULTIPLIER = 12

const SizeController = ({ onChange }) => {
  const [sizeValue, setSizeValue] = useState(DEFAULT);
  const handleSizeChange = (val) => {
    setSizeValue(val);
    onChange({ type: "size", value: val * MULTIPLIER })
  }

  return (
    <>
      <div className="grid grid-cols-5" style={{ width: "100%" }}>
        <p className="col-span-1 text-customWhite text-sm text-center mr-2">Size</p>
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