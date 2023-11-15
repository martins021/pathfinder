"use client"
import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/main.module.css"
import Controls from "../components/map/controls";
import Map from "../components/map/map";
import Actions from "../components/map/actions";
import AlgorithmMenu from "../components/map/algorithmMenu";
import { useSession } from "next-auth/react";
import { launchBfs, launchDfs } from "../apiRequests/algorithms";

const PlayGround = () => {
  const { data: session, status } = useSession();
  const [tool, setTool] = useState('start')
  const [algorithm, setAlgorithm] = useState("bfs")
  const [result, setResult] = useState({})
  const [mapSize, setMapSize] = useState({ x: 25 , y: 14 });
  const [mapData, setMapData] = useState([]);
  const [start, setStart] = useState(null);
  const [target, setTarget] = useState(null);
  const [animationSpeed, setAnimationSpeed] = useState(0.05)

  const createMap = () => {
    const data = []
    for (let y = 0; y < mapSize.y; y++) {
      for (let x = 0; x < mapSize.x; x++) {
        data.push({ x, y, state: "empty", elev: 1 })
      }
    }
    setMapData(data)
    setStart(null);
    setTarget(null);
  }

    const launchAlgorithm = async () => {
    let resp;
    switch (algorithm) {
      case "dfs":
        resp = await launchDfs(mapData, mapSize, start, target);
        break;
      case "bfs":
        resp = await launchBfs(mapData, mapSize, start, target);
        break;
      default:
        break;
    }
    setResult(resp)
  }

  useEffect(() => {
    createMap()
  }, [mapSize])
console.log(session);
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
        <button onClick={launchAlgorithm} className="text-black bg-customWhite rounded-lg text-sm p-2">Launch</button>
      </div>
      <div className={styles.mapTile}>
        <Map 
          tool={tool}
          result={result} 
          mapData={mapData}
          mapSize={mapSize}
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
          animationSpeed={animationSpeed}
          setAnimationSpeed={setAnimationSpeed}
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