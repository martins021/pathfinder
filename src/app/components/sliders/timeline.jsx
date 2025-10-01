import { useRef, useEffect, useMemo, useState } from "react";
import styles from "../../styles/timeline.module.css";
import { FaPlay, FaPause } from "react-icons/fa6";

export const TimeLine = ({ visitedNodes, path }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const barContainerRef = useRef(null);
  const afIdRef = useRef(null);

  const duration = useMemo(() => {
    if(!visitedNodes || !path) return [];
    const result = [];
    visitedNodes.map(node => result.push({ type: 'visited', node }));
    path.map(node => result.push({ type: 'path', node }));
    return result.length;
  }, [visitedNodes, path]);

  useEffect(() => {
    let mouseDown = false;
    
    const onMouseChange = (e) => {
      mouseDown = e.type === "mousedown" ? true : false;
      updateThumbPos(e); // update also if mouse is just pressed and not moved
    }

    const onMouseMove = (e) => updateThumbPos(e);
    
    const updateThumbPos = (e) => {
      if(!mouseDown) return;
      const rect = barContainerRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left; // x position within the progress bar
      const posToWidthRatio = clickX / rect.width; // ratio of click position to total width of the bar
      const newElapsed = posToWidthRatio * duration; // new position is the ratio of total duration
      const progressBar = document.getElementById("bar");
      progressBar.style.width = `${Math.min(newElapsed * 100 / duration, 100)}%`;

      setElapsed(newElapsed * 1000); // convert to milliseconds
    }

    if(barContainerRef?.current){
      barContainerRef.current.addEventListener("mousedown", onMouseChange)
      document.addEventListener("mouseup", onMouseChange)
      document.addEventListener("mousemove", onMouseMove)
    }

    return () => {
      barContainerRef.current.removeEventListener("mousedown", onMouseChange)
      document.removeEventListener("mouseup", onMouseChange)
      document.removeEventListener("mousemove", onMouseMove)
    }
  }, [duration])

  useEffect(() => {
    if(!isPlaying) return;
    const t0 = performance.now();
    const progressBar = document.getElementById("bar");

    const animateProgressBar = () => {
      if(!isPlaying) return;
      const delta = performance.now() - t0 + elapsed; // time passed from t0 plus previously elapsed time
      const seconds = delta / 1000; // seconds elapsed
      const timeStamp = seconds * 100 / duration; // percentage of duration
      
      if(timeStamp > 100){
        setIsPlaying(false);
      }

      progressBar.style.width = `${Math.min(timeStamp, 100)}%`;
      afIdRef.current = requestAnimationFrame(animateProgressBar);
    }
    afIdRef.current = requestAnimationFrame(animateProgressBar);

    return () => {
      if(afIdRef.current) cancelAnimationFrame(afIdRef.current);
      afIdRef.current = null;
      setElapsed((prev) => prev + (performance.now() - t0));
    }
   }, [isPlaying]);

  return (
    <div className={styles.container}>
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
          id="bar"
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