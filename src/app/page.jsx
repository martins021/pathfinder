"use client"
import { useEffect, useState, useRef, useLayoutEffect, useReducer } from "react";
import styles from "./styles/map.module.css"
import Controls from "./components/map/controls";
import Map from "./components/map/map";
import { useToast } from '@chakra-ui/react'
import { settingsReducer } from "./helpers";
import { initialSettings } from "@/lib/configs";

const PlayGround = () => {
  const [settings, dispatch] = useReducer(settingsReducer, initialSettings);
  const { nodeSize, size, algorithm, tool, brushSize, brushMode } = settings;

  const [result, setResult] = useState({}) // result of the algorithm
  const [mapData, setMapData] = useState([]);
  const [start, setStart] = useState(null); // start node
  const [target, setTarget] = useState(null); // target node
  const [searching, setSearching] = useState(false); // algorithm running
  const toast = useToast();

  const createMap = () => {
    const startX = Math.floor(size.x / 3);
    const startY = Math.floor(size.y / 2);
    const targetX = Math.floor(size.x / 3 * 2) + 1;
    const targetY = Math.floor(size.y / 2);

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

  const resetNodes = (nodesToReset) => {
    const withoutPath = mapData.map(node => {
      if(nodesToReset.includes(node.state)){
        node.state = 'empty';
      } 
      return node;
    })

    setMapData(withoutPath);
  }

  const apiReq = async (data, size, start, target) => {
    const res = await fetch(`/api/algorithms/${algorithm}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, size, start, target })
    })
    return await res.json()
  }

  const launchAlgorithm = async () => {
    try {
      setSearching(true)
      resetNodes(["visited", "path"]);
      const data = await apiReq(mapData, size, start, target)
      if(data.error) throw new Error(data.error);
      setResult(data)
    } catch (err) {
      toast({ description: err, status: 'error', isClosable: true })
    } finally {
      setSearching(false)
    }
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
        setMapData={setMapData}
        setStart={setStart}
        setTarget={setTarget}
      />
      <Controls 
        searching={searching}
        dispatch={dispatch}
        tool={tool} 
        algorithm={algorithm}
        createMap={createMap}
        resetNodes={resetNodes}
        brushMode={brushMode}
        launchAlgorithm={launchAlgorithm}
        result={result}
      />
    </div>
  )
}

export default PlayGround;