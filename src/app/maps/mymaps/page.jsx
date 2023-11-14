"use client"
import React from "react";
import { useSession } from "next-auth/react";
import MapsGrid from "../mapsGrid";

const MyMaps = () => {
  const { data: session } = useSession();

  return (
    <div className="pt-4 p-12">
      <h1 className="text-customWhite pb-4">
        Your saved maps
      </h1>
      <MapsGrid />
    </div>
  )
}

export default MyMaps;