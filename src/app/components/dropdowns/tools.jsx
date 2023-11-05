import React, { useState } from "react";
import styles from "../../styles/toolsSelect.module.css"

const ToolsSelect = ({ tool, setTool, toolOptions }) => {
  const [open, setOpen] = useState(false);

  return (
    <div 
      className={styles.dropdown} 
      onClick={() => setOpen(!open)} 
      onMouseLeave={() => setOpen(false)}
    >
      <button className={styles.triggerBtn}>
        {toolOptions.find(opt => opt.value === tool).label}
      </button>
      {open && <div className={styles.dropdownContent}>
        {toolOptions.map(opt => (
          <div className={styles.toolsOption} onClick={() => setTool(opt.value)}>
            <p>{opt.label}</p>
            <p className="text-xs text-customFadedGray">{opt.description}</p>
          </div>
        ))}
      </div>}
    </div>
  )
}

export default ToolsSelect;