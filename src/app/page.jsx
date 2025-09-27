"use client"
import { useEffect, useState, useRef, useLayoutEffect, useReducer } from "react";
import styles from "./styles/map.module.css"
import Controls from "./components/map/controls";
import Map from "./components/map/map";
import { launchBfs, launchDfs, launchDijkstra } from "./apiRequests/algorithms";
import { useToast } from '@chakra-ui/react'
import { settingsReducer } from "./helpers";
import { initialSettings } from "@/lib/configs";

const PlayGround = () => {
  const [settings, dispatch] = useReducer(settingsReducer, initialSettings);
  const { nodeSize, size, algorithm, tool, animationSpeed, brushSize, brushMode } = settings;

  const [result, setResult] = useState({}) // result of the algorithm
  const [mapData, setMapData] = useState([]);
  const [start, setStart] = useState(null); // start node
  const [target, setTarget] = useState(null); // target node
  const [animate, setAnimate] = useState(false) // indicates if the animation is running
  const animationId = useRef(0) // used to cancel animation 
  const toast = useToast();

  const createMap = () => {
    const startX = Math.floor(size.x / 3);
    const startY = Math.floor(size.y / 2);
    const targetX = Math.floor(size.x / 3 * 2) + 1;
    const targetY = Math.floor(size.y / 2);

    setAnimate(false)
    animationId.current += 1
    const data = []
    for (let y = 0; y < size.y; y++) {
      for (let x = 0; x < size.x; x++) {
        if(x % size.x === startX && y % size.y   === startY){
          data.push({ x, y, state: "start", prevState: "empty", elev: 1 })
        } else if(x % size.x === targetX && y % size.y === targetY){
          data.push({ x, y, state: "target", prevState: "empty", elev: 1 })
        } else {
          data.push({ x, y, state: "empty", prevState: "empty", elev: 1 })
        }
      }
    }
    setMapData(data)
    setStart(startY * size.x + startX);
    setTarget(targetY * size.x + targetX);
  }

  const clearPath = () => {
    setAnimate(false)
    animationId.current += 1
    const withoutPath = mapData.map(node => {
      if(node.state === 'visited' || node.state === 'path'){
        return ({
          ...node, 
          state: 'empty'
        });
      } 
      return node;
    })

    setMapData(withoutPath);
  }

  const launchAlgorithm = async () => {
    clearPath();
    animationId.current += 1
    let resp;
    switch (algorithm) {
      case "dfs":
        resp = await launchDfs(mapData, size, start, target);
        break;
      case "bfs":
        resp = await launchBfs(mapData, size, start, target);
        break;
      case "dijkstra":
        resp = await launchDijkstra(mapData, size, start, target);
        break;
      default:
        break;
    }
    
    if(resp.error){
      toast({
        description: resp.error,
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
    }
    setResult(resp)
  }

  useEffect(() => {
    createMap()
  }, [size])

  const handleResize = () => dispatch({type: "size", value: nodeSize});

  useLayoutEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [nodeSize])

  return (
    <div className={styles.mainGrid} >
      <Map 
        tool={tool}
        result={result} 
        mapData={mapData}
        size={size}
        brushSize={brushSize}
        brushMode={brushMode}
        animationSpeed={animationSpeed}
        animate={animate}
        animationId={animationId}
        setMapData={setMapData}
        setStart={setStart}
        setTarget={setTarget}
        clearPath={clearPath}
        setAnimate={setAnimate}
      />
      <Controls 
        dispatch={dispatch}
        tool={tool} 
        algorithm={algorithm}
        animationInProgress={animate}
        createMap={createMap}
        clearPath={clearPath}
        brushMode={brushMode}
        launchAlgorithm={launchAlgorithm}
      />
      {/* <div className={styles.results}>
        {Object.keys(result).length ?
          <div className="flex flex-col gap-4">
            <p>Visited nodes: {result.visitedNodes?.length}</p>
            <p>Path length: {result.path?.length}</p>
            <p>Visited precentage: {result.precentageVisited?.toFixed(2)}%</p>
          </div>
        : <p>Launch an algorithm to see visualization</p>}
      </div> */}
    </div>
  )
}

export default PlayGround;