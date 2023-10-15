"use client"
import React from "react";
import SizeController from "./sizeController";
import SaveBtn from "./saveBtn";
import { fetchMaps } from "@/lib/apiRequests";

const Actions = () => {
  const saveMap = async () => {
    console.log("hi");
    const test = await fetchMaps();
    console.log(test);
  }
  return (
    <>
      <SizeController />
      <SaveBtn onClick={saveMap} />
    </>
  );
}

export default Actions;