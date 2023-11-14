import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { fetchMaps } from "../apiRequests/maps";
import MapContainer from "./mapContainer";

const MapsGrid = () => {
  const [ data, setData ] = useState()

  const getData = useCallback( async () => {
    console.log("hi");
    const data = await fetchMaps();
    console.log("Fetch maps res: ", data);
    setData(data);
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <div className="grid grid-cols-4 gap-6 ">
      {data?.map(map => (
        <MapContainer
          key={map.id}
          name={map.name}
          algorithm={map.algorithm}
          speed={map.animationSpeed}
          createdAt={map.createdAt}
        />
      ))}
    </div>
  )
}

export default MapsGrid;