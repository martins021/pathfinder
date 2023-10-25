"use client"
import React, { useContext } from "react";
import SaveBtn from "./buttons/saveBtn";
import { fetchMaps } from "@/app/apiRequests/maps";
import { launchBfs, launchDfs } from "../apiRequests/algorithms";

const Actions = ({ algorithm, setPath, mapData, setMapData, mapSize, start, target }) => {
  const saveMap = async () => {
    console.log("hi");
    const test = await fetchMaps();
    console.log(test);
  }

  const visuzalizeAlgorithm = (path, visited) => {
    const h = ["start", "target", "wall"]

    const newMapData = mapData.map((cell, i) => {
      if(path.includes(i) && !h.includes(cell.state)){
        cell.state = "path"
      } else if(visited.includes(i) && !h.includes(cell.state)){
        cell.state = "visited"
      }
      return cell;
    })

    setMapData(newMapData);
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

    visuzalizeAlgorithm(resp.path, resp.visitedNodes)
  }

  return (
    <>
      <SaveBtn onClick={saveMap} />
      <button onClick={launchAlgorithm} className="text-black bg-customWhite rounded-lg text-sm p-2">Launch</button>
    </>
  );
}

export default Actions;