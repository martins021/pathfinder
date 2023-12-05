"use client"
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { fetchMaps } from "../apiRequests/maps";
import MapContainer from "./mapContainer";
import Filters from "../components/forms/filters";
import Loading from "./loading";
import Sorters from "../components/forms/sorters";

const MyMaps = ({ ref }) => {
  const { data: session } = useSession();
  const [ data, setData ] = useState()
  const [ loading, setLoading ] = useState(false)
  const [filters, setFilters] = useState({});
  const [sorters, setSorters] = useState({ param: "createdAt", direction: "desc" });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
    
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchMaps(searchParams.toString());
      setLoading(false);
      setData(data);
    }
    getData();
  }, [searchParams])

  useEffect(() => {
    console.log("Filters: ", filters);
    console.log("Sorter: ", sorters);
    const params = new URLSearchParams({ ...filters, ...sorters});  
    router.replace(pathname + "?" + params.toString());
  }, [filters, sorters])

  return (
    <div className="pt-4 p-12">
      <h1 className="text-customWhite pb-4 font-bold text-xl">
        {ref === "my" ? "Your published maps" : "Published maps" }
      </h1>

      <div className="grid grid-cols-6">
        <div className="col-start-1 col-end-2">
          <Filters filters={filters} setFilters={setFilters} />
        </div>

        {loading ? 
          (<Loading />) : 
          ( data && data.length ? 
            (<div className="col-start-2 col-end-7">
              <Sorters 
                sorters={sorters} 
                setSorters={setSorters} 
              />
              <div className="grid grid-cols-4 gap-6 ">
                {data?.map(map => (
                  <MapContainer
                    key={map.id}
                    mapId={map.id}
                    name={map.name}
                    algorithm={map.algorithm}
                    speed={map.animationSpeed}
                    size={map.size}
                    createdAt={map.createdAt}
                  />
                ))}
              </div>
              <div className="flex justify-center">
                load more
              </div>
            </div>) : 
            <div className="text-customWhite">
              There are no saved maps
            </div>
          )}
      </div>
    </div>
  )
}

export default MyMaps;