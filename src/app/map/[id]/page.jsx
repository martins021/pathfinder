"use client"
const { default: PlayGround } = require("../playground");
import { fetchMap } from '@/app/apiRequests/map';
import Loading from '@/app/components/loading';
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from "react";

const Map = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  const mapId = pathname.split("/")[2];
  const [initialData, setInitialData] = useState({});

  const getData = async () => {
    setLoading(true);

    const data = await fetchMap(mapId);
    const calculatedMapSizeY = Math.round((9 / 16) * data.size);
    setInitialData({
      mapId,
      initialMapSize: { x: data.size, y: calculatedMapSizeY },
      inintialMapData: data.mapData,
      initialAnimationSpeed: parseFloat(data.animationSpeed),
      initialAlgorithm: data.algorithm,
      initialStart: data.start,
      initialTarget: data.target
    })

    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [mapId])


  return (
    <>
      { loading ? 
        (<Loading />) : 
        (
          <PlayGround 
            mapId={mapId}
            initialMapSize={initialData.initialMapSize}
            inintialMapData={initialData.inintialMapData}
            initialAnimationSpeed={initialData.initialAnimationSpeed}
            initialAlgorithm={initialData.initialAlgorithm}  
            initialStart={initialData.initialStart}
            initialTarget={initialData.initialTarget}
          />
        )}
    </>
  )
}

export default Map;