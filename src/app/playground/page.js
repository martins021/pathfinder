"use client"
import React, { useContext, useEffect, useState } from "react";
import Map from '@/app/components/map'
import Controls from '@/app/components/controls'
import Actions from '@/app/components/actions'
import AlgorithmMenu from '@/app/components/algorithmMenu'
import styles from '../styles/main.module.css'

const PlayGround = () => {
  const [tool, setTool] = useState('start')
  const [algorithm, setAlgorithm] = useState("bfs")
  const [path, setPath] = useState([])
  const [mapSize, setMapSize] = useState({ x: 50 , y: 30 });
  const [mapData, setMapData] = useState([]);
  const [start, setStart] = useState(null);
  const [target, setTarget] = useState(null);

  const createMap = () => {
    const data = []
    for (let y = 0; y < mapSize.y; y++) {
      for (let x = 0; x < mapSize.x; x++) {
        data.push({ x, y, state: "empty", elev: 1 })
      }
    }
    setMapData(data)
  }

  useEffect(() => {
    createMap()
  }, [mapSize])
  
  return (
    <div className={styles.mainGrid} >
    <div className={styles.actionsTile}>
      <Actions 
        algorithm={algorithm}
        setPath={setPath} 
        mapData={mapData}
        setMapData={setMapData}
        mapSize={mapSize}
        start={start}
        target={target}
      />
    </div>
    <div className={styles.mapTile}>
      <Map 
        tool={tool}
        path={path} 
        mapData={mapData}
        mapSize={mapSize}
        start={start}
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