import React from "react";
import AlgorithmBtn from "../buttons/algorithmBtn";
import { toolOptions } from "@/lib/configs";
import { Title } from "../atoms/title";

const menuStyle ={
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: ".5vw",
}

const ToolMenu = ({ tool, onChange }) => {
  return (
    <>
      <Title text="Toolbox" />
      <div style={menuStyle}>
        {toolOptions.map(option => (
          <AlgorithmBtn 
            key={option.value}
            onClick={() => onChange({ type: "tool", value: option.value })} 
            title={option.label}
            selected={tool === option.value}
          />    
        ))}
      </div>
    </>
  );
}

export default ToolMenu;