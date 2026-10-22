import React, { useEffect, useId, useRef, useState } from "react";
import styles from "../../styles/toolsSelect.module.css"
import { algorithmOptions } from "@/lib/configs";
import { Title } from "../atoms/title";
import { FaRoute, FaCaretDown, FaCheck } from "react-icons/fa6";

const AlgorithmSelect = ({ algorithm, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event) => {
      if (!dropdownRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  return (
    <>
      <Title text="Selected Algorithm" />
      <div 
        ref={dropdownRef}
        className={styles.dropdown}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            event.preventDefault();
            setOpen(false);
            triggerRef.current?.focus();
          }
        }}
      >
        <button
          ref={triggerRef}
          type="button"
          className={styles.triggerBtn}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen(!open)}
        >
          <FaRoute size={25} aria-hidden="true" />
          {algorithmOptions.find(opt => opt.value === algorithm).label}
          <FaCaretDown size={25} aria-hidden="true" />
        </button>
        
        {open && <div id={menuId} className={styles.dropdownContent}>
          {algorithmOptions.map(opt => (
            <button
              type="button"
              key={opt.value}
              className={`${styles.toolsOption} ${algorithm === opt.value ? styles.selectedOption : ""}`}
              aria-pressed={algorithm === opt.value}
              onClick={() => {
                onChange({ type: "algorithm", value: opt.value });
                setOpen(false);
                triggerRef.current?.focus();
              }}
            >
              <span className={styles.optionCopy}>
                <span className={styles.optionLabel}>{opt.label}</span>
                <span className={styles.optionDescription}>{opt.description}</span>
              </span>
              <span className={styles.optionIndicator} aria-hidden="true">
                {algorithm === opt.value && <FaCheck size={12} />}
              </span>
            </button>
          ))}
        </div>}
      </div>
    </>
  )
}

export default AlgorithmSelect;
