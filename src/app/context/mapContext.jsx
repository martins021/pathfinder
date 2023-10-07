"use client"
import { useState, createContext } from "react";

const MapContext = createContext(null);

export const MapProvider = ({ children }) => {
  const initData = []
  for (let i = 0; i < 40; i++) {
    for (let j = 0; j < 70; j++) {
      if(i === 4 && j === 10){
        initData.push({
          x: i,
          y: j,
          state: "start",
          elev: 1
        })
      } else if (i === 30 && j === 50){
        initData.push({
          x: i,
          y: j,
          state: "finish",
          elev: 1
        })
      } else {
        initData.push({
          x: i,
          y: j,
          state: "empty",
          elev: 1
        })
      }
    }
  }
  const [mapData, setMapData] = useState(initData);

  return (
    <MapContext.Provider value={{ mapData, setMapData }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapContext;