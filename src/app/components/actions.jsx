"use client"
import React, { useContext } from "react";
import SaveBtn from "./saveBtn";
import { fetchMaps } from "@/app/apiRequests/maps";
import { launchBfs, launchDfs } from "../apiRequests/algorithms";
import MapContext from "../context/mapContext";

const Actions = ({ algorithm }) => {
  const { mapData, mapSize, start, target } = useContext(MapContext);

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
  }

  return (
    <>
      <SaveBtn onClick={saveMap} />
      <button onClick={launchAlgorithm} className="text-black bg-white rounded-lg text-sm p-2">Launch</button>
    </>
  );
}

export default Actions;