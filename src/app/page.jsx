"use client"
import { useEffect, useState, useLayoutEffect, useReducer, useRef, useMemo } from "react";
import styles from "./styles/map.module.css"
import Controls from "./components/map/controls";
import Map from "./components/map/map";
import { useToast } from '@chakra-ui/react'
import { settingsReducer } from "./helpers";
import { initialSettings } from "@/lib/configs";

const MIN_ELEVATION = 0
const MAX_ELEVATION = 99

const PlayGround = () => {
  const [settings, dispatch] = useReducer(settingsReducer, initialSettings);
  const { nodeSize, size, algorithm, tool, brushSize, brushMode } = settings;
  const [result, setResult] = useState({}) // result of the algorithm
  const [mapData, setMapData] = useState([]);
  const mapChanged = useRef(true);
  const [searching, setSearching] = useState(false); // algorithm running
  const toast = useToast();

  const handleSetTerrain = (index) => {
    const mapSizeX = size.x; // horizontal map size
    const mapSizeY = size.y; // vertical map size
    const squareBrushSize = brushSize * 2 - 1;

    const brushNodes = [] // 2d array containing all nodes in brush area
    for (let s = brushSize; s >= -Math.abs(brushSize - 2); s--) {
      const brushRowStart = index - (s - 1) * mapSizeX - (brushSize -1); // start node of each row within brush area
      // create array containing brush nodes from this row
      const subArray = Array.from(
        { length: squareBrushSize }, 
        (_, index) => brushRowStart + index
      ); 
      brushNodes.push(subArray);
    }

    const mapDataCopy = [...mapData];
    const mainNodeCoords = Math.floor(squareBrushSize / 2); // coordinates within the brush area of the clicked node
    for (let i = 0; i < brushNodes.length; i++) {
      // get row id of the middle element of the current brush area row
      const middleElementRow = brushNodes[i][Math.floor(brushNodes[i].length / 2)] / mapSizeX | 0 // bitwise or operator for integer division
      for (let j = 0; j < brushNodes[i].length; j++) {
        // distance from the clicked node to other nodes in brush area
        const distance = Math.sqrt(Math.pow((mainNodeCoords - i), 2) + Math.pow((mainNodeCoords - j), 2)); 
        if(distance <= brushSize - 1){ // brush will only affect these nodes
          const distanceFloored = Math.floor(distance);
          const elevToAdd = brushSize - distanceFloored;
          const affectedNodeIndex = brushNodes[i][j];

          // check if node affected by brush is within map borders and all left and right neighbors are in the same row
          if(affectedNodeIndex >= 0 && affectedNodeIndex < mapSizeX * mapSizeY && (affectedNodeIndex / mapSizeX | 0) === middleElementRow){
            const newNodeWeight = mapDataCopy[affectedNodeIndex].elev + (elevToAdd * brushMode)
            if(newNodeWeight <= MAX_ELEVATION && newNodeWeight >= MIN_ELEVATION){
              mapDataCopy[affectedNodeIndex].elev = newNodeWeight
            }
          }
        }
      }
    }

    setMapData(mapDataCopy);
    mapChanged.current = true;
  } 

  const handleNodeAction = (index) => {
    const node = mapData[index];
    if(!node) return;
    let setState = false;
    const { state } = node;

    switch (tool) {
      case "empty":
        setState = true;
        break;
      case "start":
        if (state !== "target" && state !== "wall") setState = true;
        break;
      case "target":
        if (state !== "start" && state !== "wall") setState = true;
        break;
      case "wall":
        if (state !== "start" && state !== "target") setState = true;
        break;
      case "terrain":
        if(state === "empty" || state === "terrain" || state === "visited" || state === "path"){
          handleSetTerrain(index)
        }
        break;
    }

    if(!setState) return;

    setMapData(prev => {
      const copy = prev.slice();
      if(tool === "start" || tool === "target"){
        copy.map(n => {
          if(n.state === tool) n.state = n.prevState;
          return n;
        })
      }
      copy[index] = {...copy[index], state: tool, prevState: copy[index].state };
      return copy;
    })
    mapChanged.current = true;
  }

  const createMap = () => {
    const startX = Math.floor(size.x / 3);
    const startY = Math.floor(size.y / 2);
    const targetX = Math.floor(size.x / 3 * 2) + 1;
    const targetY = Math.floor(size.y / 2);

    const data = []
    for (let y = 0; y < size.y; y++) {
      for (let x = 0; x < size.x; x++) {
        if(x % size.x === startX && y % size.y   === startY){
          data.push({ x, y, state: "start", prevState: "empty", elev: 0 })
        } else if(x % size.x === targetX && y % size.y === targetY){
          data.push({ x, y, state: "target", prevState: "empty", elev: 0 })
        } else {
          data.push({ x, y, state: "empty", prevState: "empty", elev: 0 })
        }
      }
    }
    setMapData(data)
  }

  const resetNodes = (nodesToReset) => {
    setMapData(prev => prev.map(node => {
      if(nodesToReset.includes(node.state)) node.state = 'empty'; 
      return node;
    }))
    mapChanged.current = true;
  }

  const apiReq = async (data, size) => {
    const res = await fetch(`/api/algorithms/${algorithm}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, size })
    })
    return await res.json()
  }

  const launchAlgorithm = async () => {
    try {
      if(!mapChanged.current) return false;
      setSearching(true)
      resetNodes(["visited", "path"]);
      const data = await apiReq(mapData, size)
      if(data.error) throw new Error(data.error);
      setResult(data)
      mapChanged.current = false;
      return true;
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

  const gridStyle = useMemo(() => ({
    gridTemplateRows: `repeat(${size.y}, 1fr)`,
    gridTemplateColumns: `repeat(${size.x}, 1fr)`,
  }), [size]);

  return (
    <div className={styles.mainGrid} >
      <Map 
        handleNodeAction={handleNodeAction}
        result={result} 
        mapData={mapData}
        setMapData={setMapData}
        gridStyle={gridStyle}
        launchAlgorithm={launchAlgorithm}
        searching={searching}
      />
      <Controls 
        dispatch={dispatch}
        tool={tool} 
        algorithm={algorithm}
        createMap={createMap}
        resetNodes={resetNodes}
        brushMode={brushMode}
        result={result}
      />
    </div>
  )
}

export default PlayGround;