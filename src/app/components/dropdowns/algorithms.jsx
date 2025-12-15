import React, { useState } from "react";
import styles from "../../styles/toolsSelect.module.css"
import { algorithmOptions } from "@/lib/configs";
import { Title } from "../atoms/title";
import { FaRoute, FaCaretDown } from "react-icons/fa6";

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
          <FaRoute size={25} />
          {algorithmOptions.find(opt => opt.value === algorithm).label}
          <FaCaretDown size={25} />
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