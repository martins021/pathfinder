"use client"
import React, { useRef, useEffect, useState } from "react";
import SaveBtn from "./buttons/saveBtn";
import { fetchMaps, saveMap } from "@/app/apiRequests/maps";
import { launchBfs, launchDfs } from "../apiRequests/algorithms";

const Actions = ({ algorithm, setResult, mapData, mapSize, start, target, animationSpeed }) => {
  const [mapName, setMapName] = useState("");
  const mapNameChanged = useRef(false); // tells wether user has changed name manually

  const handleNameChange = (name) => {
    setMapName(name);
    mapNameChanged.current = true;
  }

  const handleSave = async () => {
    // const test = await fetchMaps();
    const dataToSave = {
      name: mapName,
      mapData,
      animationSpeed,
      algorithm
    }
    saveMap(dataToSave);
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
      if(!mapNameChanged.current){ 
        const { x, y } = mapSize;
        const newMapName = `${algorithm} ${x}x${y}`
        setMapName(newMapName.charAt(0).toUpperCase() + newMapName.slice(1))
      }
  }, [algorithm, mapSize])

  return (
    <>
      <form>
        <label>Name</label>
        <input type="text" id="mapName" name="mapName" value={mapName} onChange={(e) => handleNameChange(e.target.value)} />
      </form>
      <SaveBtn onClick={handleSave} />
      <button onClick={launchAlgorithm} className="text-black bg-customWhite rounded-lg text-sm p-2">Launch</button>
    </>
  );
}

export default Actions;