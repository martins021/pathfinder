import React from "react";
import AlgorithmBtn from "../buttons/algorithmBtn";
import { toolOptions } from "@/lib/configs";
import { Title } from "../atoms/title";
import SizeController from "./sizeController";
import BrushController from "./brushController";

const menuStyle ={
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: ".5vw",
}

const ToolMenu = ({ tool, onChange, brushMode }) => {
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
      <div className="flex flex-col gap-8 mb-4 mt-4">
        <SizeController onChange={onChange} />
        {tool === "terrain" && 
          <BrushController onChange={onChange} brushMode={brushMode} />
        }
      </div>
    </>
  );
}

export default ToolMenu;