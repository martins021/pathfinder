import React from "react";

const Slider = ({ handleChange, options }) => {
  return (
    <>
      <input 
        type="range" 
        min="0" 
        max="100" 
        step="25" 
        list="steplist" 
        onChange={(e) => handleChange(e.target.value)}
      />
      <datalist id="steplist">
        {options.map(opt => {
          <option>{opt}</option>
        })}
      </datalist>
    </>
  )
};

export default Slider;