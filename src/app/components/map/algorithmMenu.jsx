import React from "react";
import AlgorithmBtn from "../buttons/algorithmBtn";
import { algorithmOptions } from "@/lib/configs";

const menuStyle ={
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: ".5vw",
}

const AlgorithmMenu = ({ algorithm, setAlgorithm }) => {
  return (
    <div style={menuStyle}>
      {algorithmOptions.map(option => (
        <AlgorithmBtn 
          key={option.value}
          onClick={() => setAlgorithm(option.value)} 
          title={option.label}
          selected={algorithm === option.value}
        />    
      ))}
    </div>
  );
}

export default AlgorithmMenu;