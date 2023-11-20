"use client"
import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { fetchMaps } from "../apiRequests/maps";
import MapContainer from "./mapContainer";
import Filters from "../components/forms/filters";
import { animationSpeedOptions } from "@/lib/configs";

const MyMaps = ({ ref }) => {
  const { data: session } = useSession();
  const [ data, setData ] = useState()
  const [filters, setFilters] = useState({});
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
    
  useEffect(() => {
    const getData = async () => {
      const data = await fetchMaps(searchParams.toString());
      const transformedData = data.map(item => {
        return ({
          ...item,
          animationSpeed: animationSpeedOptions.find(opt => opt.value === item.animationSpeed)?.label
        })
      })
      console.log("Fetch maps res: ", data);
      setData(transformedData);
    }
    getData();
  }, [searchParams])

  useEffect(() => {
    console.log("Filters: ", filters);
    const params = new URLSearchParams(filters);  
    router.replace(pathname + "?" + params.toString());
  }, [filters])

  return (
    <div className="pt-4 p-12">
      <h1 className="text-customWhite pb-4">
        {ref === "my" ? "Your published maps" : "Published maps" }
      </h1>

      <div className="grid grid-cols-6">
        <div className="col-start-1 col-end-2">
          <div className="flex flex-col justify-between">
            <Filters filters={filters} setFilters={setFilters} />
            <div>
              sorters
            </div>
          </div>
        </div>

        <div className="col-start-2 col-end-7">
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
          <div className="flex justify-center">
            load more
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyMaps;