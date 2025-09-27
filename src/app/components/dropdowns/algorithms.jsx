import React, { useState } from "react";
import styles from "../../styles/toolsSelect.module.css"
import { algorithmOptions } from "@/lib/configs";
import { Title } from "../atoms/title";

const AlgorithmSelect = ({ algorithm, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Title text="Selected Algorithm" />
      <div 
        className={styles.dropdown} 
        onClick={() => setOpen(!open)} 
        onMouseLeave={() => setOpen(false)}
      >
        <button className={styles.triggerBtn}>
          {algorithmOptions.find(opt => opt.value === algorithm).label}
        </button>
        
        {open && <div className={styles.dropdownContent}>
          {algorithmOptions.map(opt => (
            <div 
              key={opt.value} 
              className={styles.toolsOption} 
              onClick={() => onChange({ type: "algorithm", value: opt.value })}
            >
              <p>{opt.label}</p>
              <p className="text-xs text-customFadedGray">{opt.description}</p>
            </div>
          ))}
        </div>}
      </div>
    </>
  )
}

export default AlgorithmSelect;