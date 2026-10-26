"use client"
import { useEffect, useState, useLayoutEffect, useReducer, useRef, useMemo, useCallback } from "react";
import styles from "./styles/map.module.css"
import Controls from "./components/map/controls";
import ShareModal from "./components/map/shareModal";
import Map from "./components/map/map";
import { useToast } from '@chakra-ui/react'
import { settingsReducer } from "./helpers";
import { initialSettings, algorithmOptions } from "@/lib/configs";

const MIN_ELEVATION = 0
const MAX_ELEVATION = 99

const clearSearchMarks = (nodes) => nodes.map(node => ({
  ...node,
  state: ["visited", "path"].includes(node.state) ? "empty" : node.state,
  prevState: ["visited", "path"].includes(node.prevState) ? "empty" : node.prevState,
}));

const PlayGround = () => {
  const [settings, dispatch] = useReducer(settingsReducer, initialSettings);
  const { nodeSize, size, algorithm, tool, brushSize, brushMode } = settings;
  const [result, setResult] = useState({}) // result of the algorithm
  const [shareLink, setShareLink] = useState("");
  const [mapData, setMapData] = useState([]);
  const [searching, setSearching] = useState(false); // algorithm running
  const [animationVersion, setAnimationVersion] = useState(0);
  const [animationStep, setAnimationStep] = useState(0);
  const gridVersion = useRef(0); // rejects results calculated before a grid edit
  const reCalc = useRef(true); // whether to recalculate path on next launch
  const mapDataRef = useRef([]); // used so keyUp listener has access to latest mapData. With state it gets only the initial value
  const sizeRef = useRef(size); // same as above for size
  const prevAlgorithm = useRef("bfs"); 
  const toast = useToast();

  const invalidateResult = useCallback(() => {
    gridVersion.current += 1;
    reCalc.current = true;
    setResult({});
    setAnimationStep(0);
    setSearching(false);
    setMapData(clearSearchMarks);
    setAnimationVersion(version => version + 1);
  }, []);

  // sets all brush affected nodes including for setting terrain, walls and nodes
  const handleBrushAction = (index) => {
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

    const mapDataCopy = mapData.map(node => ({ ...node }));
    const mainNodeCoords = Math.floor(squareBrushSize / 2); // coordinates within the brush area of the clicked node
    for (let i = 0; i < brushNodes.length; i++) {
      // get row id of the middle element of the current brush area row
      const middleElementRow = brushNodes[i][Math.floor(brushNodes[i].length / 2)] / mapSizeX | 0 // bitwise or operator for integer division
      for (let j = 0; j < brushNodes[i].length; j++) {
        // distance from the clicked node to other nodes in brush area
        const distance = Math.sqrt(Math.pow((mainNodeCoords - i), 2) + Math.pow((mainNodeCoords - j), 2)); 
        if(distance <= brushSize - 1){ // brush will only affect these nodes
          const distanceFloored = Math.floor(distance);
          const affectedNodeIndex = brushNodes[i][j];
          
          // check if node affected by brush is within map borders and all left and right neighbors are in the same row
          if(affectedNodeIndex >= 0 && affectedNodeIndex < mapSizeX * mapSizeY && (affectedNodeIndex / mapSizeX | 0) === middleElementRow){
            if(tool === "terrain"){
              const elevToAdd = brushSize - distanceFloored;
              const newNodeWeight = mapDataCopy[affectedNodeIndex].elev + (elevToAdd * brushMode)
              if(newNodeWeight <= MAX_ELEVATION && newNodeWeight >= MIN_ELEVATION){
                mapDataCopy[affectedNodeIndex].elev = newNodeWeight
              }
            } else {
              mapDataCopy[affectedNodeIndex].state = tool
            }
          }
        }
      }
    }

    setMapData(mapDataCopy);
    invalidateResult();
  } 

  const handleNodeAction = (index) => {
    const node = mapData[index];
    if(!node) return;
    let setState = false;
    const { state } = node;

    switch (tool) {
      case "empty":
        handleBrushAction(index)
        break;
      case "start":
        if (state !== "target" && state !== "wall") setState = true;
        break;
      case "target":
        if (state !== "start" && state !== "wall") setState = true;
        break;
      case "wall":
        if (state !== "start" && state !== "target") {
          handleBrushAction(index)
        }
        break;
      case "terrain":
        if(state === "empty" || state === "terrain" || state === "visited" || state === "path"){
          handleBrushAction(index)
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
    invalidateResult();
  }

  const createMap = useCallback(() => {
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
    invalidateResult();
  }, [size.x, size.y, invalidateResult])

  const resetNodes = useCallback((nodesToReset) => {
    if(nodesToReset === "elevation"){
      setMapData(prev => prev.map(node => {
        return { ...node, elev: 0 };
      }))
    } else {
      setMapData(prev => prev.map(node => {
        return nodesToReset.includes(node.state) ? { ...node, state: "empty" } : node;
      }))
    }
    invalidateResult();
  }, [invalidateResult]);

  const apiReq = async (data, size) => {
    const res = await fetch(`/api/algorithms/${algorithm}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, size })
    })
    return await res.json()
  }

  const launchAlgorithm = async () => {
    const version = gridVersion.current;
    try {
      if(!reCalc.current) return false;
      setSearching(true)
      const nodes = clearSearchMarks(mapDataRef.current);
      setMapData(nodes);
      const data = await apiReq(nodes, sizeRef.current);
      if(version !== gridVersion.current) return null;
      if(data.error) throw new Error(data.error);
      setResult(data)
      reCalc.current = false;
      return true;
    } catch (err) {
      if(version !== gridVersion.current) return null;
      toast({ description: err.message, status: 'error', isClosable: true })
      return null;
    } finally {
      if(version === gridVersion.current) setSearching(false)
    }
  }

  useEffect(() => {
    mapDataRef.current = mapData;
  }, [mapData]);
  
  useLayoutEffect(() => {
    createMap();
    sizeRef.current = size;
  }, [createMap, size])
  
  useEffect(() => {
    if(prevAlgorithm.current === "dijkstra"){
      // if we change from dijkstra to other alg, we remove elevation and set tool to start, because terrain tool is only available for dijkstra
      resetNodes("elevation")
      dispatch({ type: "tool", value: "start" })
    } else {
      invalidateResult();
    }
    prevAlgorithm.current = algorithm;
  }, [algorithm, invalidateResult, resetNodes])

  const handleResize = useCallback(() => dispatch({type: "size", value: nodeSize}), [nodeSize])

  useLayoutEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize, nodeSize])

  const gridStyle = useMemo(() => ({
    gridTemplateRows: `repeat(${size.y}, 1fr)`,
    gridTemplateColumns: `repeat(${size.x}, 1fr)`,
  }), [size]);

  const storeRLE = (urlEncodedNodes, prev, rleCount, i) => {
    if(rleCount.value === 0) return

    urlEncodedNodes.pop() // the first consecutive element was already stored. Now we remove it. 
    const consecutiveNodes = rleCount.value + 1 // + 1 for the first consecutive node
    // store the RLE value and count pair in format [starting index,count:value] 
    urlEncodedNodes.push(`${i - consecutiveNodes},${consecutiveNodes}:${prev}`)
    rleCount.value = 0
  }

  const generateUrl = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const sizeParam = size.x + "," + size.y

    // nodes are encoded like ?map=index[state[elevation]]-index[state[elevation]]
    // for example 3s5-12t-18-25e7 represents 4 nodes: 
    // ix 3, start state, and elevation of 5
    // ix 12, target state, and elevation of 0 (if no elevation shown, then 0 is assumed)
    // ix 18, empty state (if no state shown then empty is assumed), and elevation of 0
    // ix 25, empty state, and elevation of 7 (if elevation is not 0 we still show the empty state explicitly so that it acts as separator between index and elevation)
    // additionally we use Run-length encoding (RLE) that replaces consecutive repeating nodes with a single value-and-count pair

    // Used for RLE. Stores the state and elevation representation of the previous node. Example: s9 or e4 or empty string
    let prev = null;
    // Used for RLE. Amount of currently consecutive repeating nodes that can be encoded using RLE.
    const rleCount = { value: 0 }; // store in object so that its passed as reference to storeRLE func
    const urlEncodedNodes = []
    for (let i = 0; i < mapData.length; i++) {
      let { state, elev } = mapData[i];
      // dont encode walls. While decoding, all missing indices will become walls automatically
      if (state === "wall") {
        storeRLE(urlEncodedNodes, prev, rleCount, i)
        prev = "wall"
        continue
      } else if (["visited", "path"].includes(state)){
        state = "empty"
      }

      const startOrTarget = ["start", "target"].includes(state) 
      const urlEncodedNode = `${i}${elev || startOrTarget ? state.charAt(0) : ""}${elev || ""}`
      const ixOfLetter = urlEncodedNode.search(/[a-z]/i);
      const withoutIx = ixOfLetter === -1 ? "" : urlEncodedNode.slice(ixOfLetter);

      if(withoutIx === prev && i !== mapData.length - 1){ // if its the last one we store it instead of continuing
        rleCount.value++
        continue
      }

      storeRLE(urlEncodedNodes, prev, rleCount, i)
      urlEncodedNodes.push(urlEncodedNode)
      prev = withoutIx
    }

    const mapParam = urlEncodedNodes.join("-");

    params.set("alg", algorithm);
    params.set("size", sizeParam);
    params.set("map", mapParam);
    url.search = params.toString();

    console.log(mapParam);
    return url.href;
  };

  const shareUrl = () => {
    setShareLink(generateUrl());
  }

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
        animationVersion={animationVersion}
        onStepChange={setAnimationStep}
      />
      <Controls 
        dispatch={dispatch}
        tool={tool} 
        algorithm={algorithm}
        createMap={createMap}
        resetNodes={resetNodes}
        brushMode={brushMode}
        result={result}
        animationStep={animationStep}
        totalNodes={mapData.length}
        onShare={shareUrl}
      />
      {shareLink && <ShareModal url={shareLink} onClose={() => setShareLink("")} />}
    </div>
  )
}

export default PlayGround;
