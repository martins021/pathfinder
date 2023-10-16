"use client"
import React from "react";
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
      <SaveBtn onClick={saveMap} />
    </>
  );
}

export default Actions;