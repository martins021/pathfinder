import { useRef, useEffect, useMemo, useState } from "react";
import styles from "../../styles/timeline.module.css";
import { FaPlay, FaPause } from "react-icons/fa6";
import { speedOptions } from "@/lib/configs";
import { Spinner } from '@chakra-ui/react'

const TimeLine = ({ duration, onChange, launchAlgorithm, searching }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(20); // speed multiplier
  const [elapsed, setElapsed] = useState(0); // current elapsed time in the animation
  const prevStep = useRef(0);
  const barContainerRef = useRef(null);
  const progressRef = useRef(null);
  const afIdRef = useRef(null);
  const autoStopped = useRef(false); // if time was auto stopped by reaching the end, on next play start from beginning

  const formatTime = (seconds) => {
    const wholeMins = Math.floor(seconds / speed / 60)
    const rem = Math.floor(seconds / speed % 60)
    return `${wholeMins < 10 ? "0" : ""}${wholeMins}:${rem < 10 ? "0" : ""}${rem}`
  }

  const changeSpeed = () => {
    const currentIx = speedOptions.findIndex(o => o.value === speed)
    const nextIx = currentIx === 4 ? 0 : currentIx + 1; 
    setSpeed(speedOptions[nextIx].value)
  }

  useEffect(() => {
    const step = Math.floor(elapsed);
    onChange(step, prevStep.current);
    prevStep.current = step
  }, [elapsed]);

  const updateProgressBar = (timeElapsed) => { // timeElapsed in seconds
    const progress = timeElapsed / duration // percentage of duration
    if(progress > 1) {
      setIsPlaying(false);
      autoStopped.current = true;
    } else {
      autoStopped.current = false;
    }
    if(!progressRef.current) return;
    progressRef.current.style.width = `${Math.min(progress * 100, 100)}%`;
    setElapsed(timeElapsed);
  }

  useEffect(() => {
    if(searching) return;
    let mouseDown = false;
    
    const onMouseChange = (e) => {
      mouseDown = e.type === "mousedown";
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

    barContainerRef.current?.addEventListener("mousedown", onMouseChange)
    document.addEventListener("mouseup", onMouseChange)
    document.addEventListener("mousemove", onMouseMove)

    return () => {
      barContainerRef.current?.removeEventListener("mousedown", onMouseChange)
      document.removeEventListener("mouseup", onMouseChange)
      document.removeEventListener("mousemove", onMouseMove)
    }
  }, [duration]);

  
  useEffect(() => {
    const spacebarUp = (e) => {
      if(e.code === "Space") onPlayBtnClick();
    }
    
    window.addEventListener("keyup", spacebarUp);
    return () => {
      window.removeEventListener("keyup", spacebarUp);
    }
  }, [isPlaying])


  useEffect(() => {
    if(!isPlaying) return;
    const t0 = performance.now();
    const elapsedAtStart = autoStopped.current ? 0 :elapsed * 1000; // elapsed time in ms at the start of playing

    const animateProgressBar = () => {
      if(!isPlaying) return;
      const delta = ((performance.now() - t0) * speed + elapsedAtStart) / 1000; // time passed from t0 plus previously elapsed time in seconds
      updateProgressBar(delta);
      afIdRef.current = requestAnimationFrame(animateProgressBar);
    }
    afIdRef.current = requestAnimationFrame(animateProgressBar);

    return () => {
      if(afIdRef.current) cancelAnimationFrame(afIdRef.current);
      afIdRef.current = null;
    }
   }, [isPlaying, speed]);

  const onPlayBtnClick = async () => {
    if(isPlaying){
      setIsPlaying(false);
    } else {
      const newData = await launchAlgorithm();
      if(newData) setElapsed(0); // start animation from beginning if new data was generated
      setIsPlaying(true);
    }
  }

  return (
    <div className={`${styles.container} ${searching ? styles.disabled : ""}`}>
      <div 
        className={styles.playButton} 
        onClick={onPlayBtnClick}
      >
        {searching 
          ? <Spinner /> 
          : isPlaying 
            ? <FaPause color="white" size={32}/> 
            : <FaPlay color="white" size={32}/>
        }
      </div>
      <div 
        className={styles.speedControl}
        onClick={changeSpeed}
      >
        {speedOptions.find(o => o.value === speed).label}
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
      <div className={styles.timeRender}>
        {searching ? "00:00 / 00:00" : `${formatTime(elapsed)} / ${formatTime(duration)}`}
      </div>
    </div>
  )
}

export default TimeLine;