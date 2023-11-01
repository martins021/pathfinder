"use client"
import React, { useContext } from "react";
import SaveBtn from "./buttons/saveBtn";
import { fetchMaps } from "@/app/apiRequests/maps";
import { launchBfs, launchDfs } from "../apiRequests/algorithms";

const Actions = ({ algorithm, setResult, mapData, mapSize, start, target }) => {
  const saveMap = async () => {
    console.log("hi");
    const test = await fetchMaps();
    console.log(test);
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

  return (
    <>
      <SaveBtn onClick={saveMap} />
      <button onClick={launchAlgorithm} className="text-black bg-customWhite rounded-lg text-sm p-2">Launch</button>
    </>
  );
}

export default Actions;