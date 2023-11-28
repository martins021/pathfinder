"use client"
import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/main.module.css"
import Controls from "../components/map/controls";
import Map from "../components/map/map";
import Actions from "../components/map/actions";
import AlgorithmMenu from "../components/map/algorithmMenu";
import { useSession } from "next-auth/react";
import { launchBfs, launchDfs, launchDijkstra } from "../apiRequests/algorithms";

const PlayGround = () => {
  const { data: session, status } = useSession();
  const [tool, setTool] = useState('start')
  const [algorithm, setAlgorithm] = useState("bfs")
  const [result, setResult] = useState({})
  const [mapSize, setMapSize] = useState({ x: 40 , y: 23 });
  const [mapData, setMapData] = useState([]);
  const [start, setStart] = useState(null);
  const [target, setTarget] = useState(null);
  const [animationSpeed, setAnimationSpeed] = useState(0.03)
  const [brushSize, setBrushSize] = useState(3)
  const [brushMode, setBrushMode] = useState(1)

  const createMap = () => {
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
          start={start}
          animationSpeed={animationSpeed}
          target={target}
          setMapData={setMapData}
          setStart={setStart}
          setTarget={setTarget}
        />
      </div>
      <div className={styles.controlsTile}>
        <Controls 
          tool={tool} 
          setTool={setTool} 
          mapSize={mapSize}
          setMapSize={setMapSize}
          createMap={createMap}
          mapData={mapData}
          setMapData={setMapData}
          setAnimationSpeed={setAnimationSpeed}
          setBrushSize={setBrushSize}
          brushMode={brushMode}
          setBrushMode={setBrushMode}
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