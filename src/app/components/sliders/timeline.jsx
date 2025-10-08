import { useRef, useEffect, useMemo, useState } from "react";
import styles from "../../styles/timeline.module.css";
import { FaPlay, FaPause } from "react-icons/fa6";

export const TimeLine = ({ duration, onChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0); // current step in the animation
  const prevStep = useRef(0);
  const barContainerRef = useRef(null);
  const progressRef = useRef(null);
  const afIdRef = useRef(null);

  useEffect(() => {
    onChange(step, prevStep.current);
    prevStep.current = step
  }, [step]);

  const updateProgressBar = (elapsedTime) => { // elapsedTime in seconds
    const progress = elapsedTime * 100 / duration // percentage of duration
    if(progress > 100) setIsPlaying(false);
    if(!progressRef.current) return;
    progressRef.current.style.width = `${Math.min(progress, 100)}%`;

    const ix = Math.ceil(duration * progress / 100);
    setStep(ix);
  }

  useEffect(() => {
    if(!barContainerRef.current) return;
    let mouseDown = false;
    
    const onMouseChange = (e) => {
      mouseDown = e.type === "mousedown";
      setIsPlaying(e.type !== "mousedown");
      updateThumbPos(e); // update also if mouse is just pressed and not moved
    }

    const onMouseMove = (e) => updateThumbPos(e);
    
    const updateThumbPos = (e) => {
      if(!mouseDown) return;
      const rect = barContainerRef.current.getBoundingClientRect();
      // x position within the progress bar (clamp from 0 to bar width)
      const clickX = Math.min(rect.width, Math.max(0, e.clientX - rect.left));
      const posToWidthRatio = clickX / rect.width; // ratio of click position to total width of the bar
      updateProgressBar(posToWidthRatio * duration); // new position is the ratio of total duration
    }

    barContainerRef.current.addEventListener("mousedown", onMouseChange)
    document.addEventListener("mouseup", onMouseChange)
    document.addEventListener("mousemove", onMouseMove)
    return () => {
      barContainerRef.current.removeEventListener("mousedown", onMouseChange)
      document.removeEventListener("mouseup", onMouseChange)
      document.removeEventListener("mousemove", onMouseMove)
    }
  }, [duration])

  useEffect(() => {
    if(!isPlaying) return;
    const t0 = performance.now();
    const elapsedAtStart = step * 1000; // elapsed time in ms at the start of playing

    const animateProgressBar = () => {
      if(!isPlaying) return;
      const delta = (performance.now() - t0 + elapsedAtStart) / 1000; // time passed from t0 plus previously elapsed time in seconds
      updateProgressBar(delta);
      afIdRef.current = requestAnimationFrame(animateProgressBar);
    }
    afIdRef.current = requestAnimationFrame(animateProgressBar);

    return () => {
      if(afIdRef.current) cancelAnimationFrame(afIdRef.current);
      afIdRef.current = null;
    }
   }, [isPlaying]);

  return (
    duration > 1 && <div className={styles.container}>
      <div 
        className={styles.playButton} 
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying 
          ? <FaPause color="white" size={32}/> 
          : <FaPlay color="white" size={32}/>
        }
      </div>
      <div 
        ref={barContainerRef}
        className={styles.barContainer}
      >
        <div
          ref={progressRef}
          className={styles.bar}
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={0}
        >
          <div 
            className={styles.thumb}
            role="slider"
          >
          </div>
        </div>
      </div>
    </div>
  )
}