"use client"
import { PrismaClient } from "@prisma/client";
import { useState, useEffect, createContext } from "react";

const MapContext = createContext(null);

export const MapProvider = ({ children }) => {
  const prisma = new PrismaClient()
  const [mapSize, setMapSize] = useState({ x: 60 , y: 34 });
  const [mapData, setMapData] = useState([]);

  const createMap = () => {
    const data = []
    console.log(mapSize);
    for (let x = 0; x < mapSize.x; x++) {
      for (let y = 0; y < mapSize.y; y++) {
        if(y === 4 && x === 10){
          data.push({ x, y, state: "start", elev: 1 })
        } else if (y === 30 && x === 50){
          data.push({ x, y, state: "finish", elev: 1 })
        } else {
          data.push({ x, y, state: "empty", elev: 1 })
        }
      }
    }
    setMapData(data)
  }

  useEffect(() => {
    createMap()
  }, [mapSize])

  return (
    <MapContext.Provider value={{ mapData, setMapData, mapSize, setMapSize }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapContext;