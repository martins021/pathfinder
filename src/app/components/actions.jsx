"use client"
import React, { useContext } from "react";
import SaveBtn from "./saveBtn";
import { fetchMaps } from "@/app/apiRequests/maps";
import { launchDfs } from "../apiRequests/algorithms";
import MapContext from "../context/mapContext";

const Actions = ({ algorithm }) => {
  const { mapData } = useContext(MapContext);

  const saveMap = async () => {
    console.log("hi");
    const test = await fetchMaps();
    console.log(test);
  }

  const launchAlgorithm = async () => {
    switch (algorithm) {
      case "dfs":
        const resp = await launchDfs(mapData);
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