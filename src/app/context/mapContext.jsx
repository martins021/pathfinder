"use client"
import { PrismaClient } from "@prisma/client";
import { useState, useEffect, createContext } from "react";

const MapContext = createContext(null);

export const MapProvider = ({ children }) => {
  const prisma = new PrismaClient()
  const [mapSize, setMapSize] = useState({ x: 55 , y: 30 });
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
    <MapContext.Provider 
      value={{ 
        mapData, 
        setMapData, 
        mapSize, 
        setMapSize,
        start,
        setStart,
        target,
        setTarget 
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapContext;