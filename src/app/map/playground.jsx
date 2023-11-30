"use client"
import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/main.module.css"
import Controls from "../components/map/controls";
import Map from "../components/map/map";
import Actions from "../components/map/actions";
import AlgorithmMenu from "../components/map/algorithmMenu";
import { useSession } from "next-auth/react";
import { launchBfs, launchDfs, launchDijkstra } from "../apiRequests/algorithms";
import { useToast } from '@chakra-ui/react'


const PlayGround = () => {
  const { data: session, status } = useSession();
  const [tool, setTool] = useState('start')
  const [algorithm, setAlgorithm] = useState("bfs")
  const [result, setResult] = useState({}) // result of the algorithm
  const [mapSize, setMapSize] = useState({ x: 40 , y: 23 });
  const [mapData, setMapData] = useState([]);
  const [start, setStart] = useState(null); // start node
  const [target, setTarget] = useState(null); // target node
  const [animationSpeed, setAnimationSpeed] = useState(0.03)
  const [animate, setAnimate] = useState(false) // indicates if the animation is running
  const [brushSize, setBrushSize] = useState(3)
  const [brushMode, setBrushMode] = useState(1)
  const animationId = useRef(0) // used to cancel animation 
  const toast = useToast();

  const createMap = () => {
    setAnimate(false)
    animationId.current += 1
    const data = []
    for (let y = 0; y < mapSize.y; y++) {
      for (let x = 0; x < mapSize.x; x++) {
        data.push({ x, y, state: "empty", prevState: "empty", elev: 1 })
      }
    }
    setMapData(data)
    setStart(null);
    setTarget(null);
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

  useEffect(() => {
    if(start){
      mapData.map(node => node.state === "start" ? node.state = node.prevState : null)
      const mapDataCopy = [...mapData];
      mapDataCopy[start].prevState = mapDataCopy[start].state;
      mapDataCopy[start].state = tool;
      setMapData(mapDataCopy);
    }
  }, [start])

  useEffect(() => {
    if(target){
      mapData.map(node => node.state === "target" ? node.state = node.prevState : null)
      const mapDataCopy = [...mapData];
      mapDataCopy[target].prevState = mapDataCopy[target].state;
      mapDataCopy[target].state = tool;
      setMapData(mapDataCopy);
    }
  }, [target])

  const launchAlgorithm = async () => {
    clearPath();
    animationId.current += 1
    let resp;
    switch (algorithm) {
      case "dfs":
        resp = await launchDfs(mapData, mapSize, start, target);
        break;
      case "bfs":
        resp = await launchBfs(mapData, mapSize, start, target);
        break;
      case "dijkstra":
        resp = await launchDijkstra(mapData, mapSize, start, target);
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
  }, [mapSize])
  
  return (
    <div className={styles.mainGrid} >
      <div className={styles.actionsTile}>
        {status === "authenticated" && <Actions 
          algorithm={algorithm}
          mapData={mapData}
          setMapData={setMapData}
          mapSize={mapSize}
          animationSpeed={animationSpeed}
          session={session}
        />}
      </div>
      <div className={styles.launchBtn}>
        <button 
          onClick={launchAlgorithm} 
          className="text-black bg-customWhite rounded-lg text-sm p-3 pl-10 pr-10 font-bold 
                    hover:bg-customRed hover:text-customWhite transition-all duration-300"
        >
          Launch
        </button>
      </div>
      <div className={styles.mapTile}>
        <Map 
          tool={tool}
          result={result} 
          mapData={mapData}
          mapSize={mapSize}
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
      </div>
      <div className={styles.controlsTile}>
        <Controls 
          tool={tool} 
          setTool={setTool} 
          mapSize={mapSize}
          setMapSize={setMapSize}
          createMap={createMap}
          clearPath={clearPath}
          setAnimationSpeed={setAnimationSpeed}
          setBrushSize={setBrushSize}
          brushMode={brushMode}
          setBrushMode={setBrushMode}
          animationInProgress={animate}
        />
      </div>
      <div className={styles.algorithmsTile}>
        <AlgorithmMenu 
          algorithm={algorithm}
          setAlgorithm={setAlgorithm} 
        />
      </div>
    </div>
  )
}

export default PlayGround;