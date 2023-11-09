"use client"
import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchMaps, saveMap } from "@/app/apiRequests/maps";
import { launchBfs, launchDfs } from "../../apiRequests/algorithms";

const Actions = ({ algorithm, setResult, mapData, mapSize, start, target, animationSpeed }) => {
  const [mapName, setMapName] = useState("");
  const mapNameChanged = useRef(false); // tells wether user has changed name manually
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  const handleSave = async () => {
    const test = await fetchMaps();
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
    const { x, y } = mapSize;
    const newMapName = `${algorithm} ${x}x${y}`
    setMapName(newMapName.charAt(0).toUpperCase() + newMapName.slice(1))
  }, [algorithm, mapSize])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap justify-around">
          <div>
            <input  
              { 
                ...register("mapName", 
                { required: true, maxLength: 30 }) 
              }
              placeholder="Map name"
              defaultValue={mapName} 
              className="rounded-md p-1.5 bg-customHoverGray focus:outline-none focus:border-customViolet focus:ring-1 focus:ring-customViolet border-2 transition-colors duration-300"
            />
            { errors.mapName?.type === 'required' && <p className="text-customRed">This field is required</p> }
            { errors.mapName?.type === 'maxLength' &&  <p className="text-customRed">Name is too long</p> }
          </div>
          <div>
            <input type="submit" value="Save" className="bg-mainBtn pl-4 pr-4 p-1.5 text-customWhite rounded-md cursor-pointer" />
            <p></p>
          </div>
        </div>
      </form>
      <button onClick={launchAlgorithm} className="text-black bg-customWhite rounded-lg text-sm p-2">Launch</button>
    </>
  );
}

export default Actions;