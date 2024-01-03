"use client"
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Button } from '@chakra-ui/react'
import { fetchMaps } from "../apiRequests/maps";
import MapContainer from "./mapContainer";
import Filters from "../components/forms/filters";
import Loading from "../components/loading";
import Sorters from "../components/forms/sorters";
import { useToast } from '@chakra-ui/react'

const Maps = ({ myMaps = false }) => {
  const { data: session, status } = useSession();
  const [ data, setData ] = useState()
  const [ loading, setLoading ] = useState(false)
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [filters, setFilters] = useState({});
  const [sorters, setSorters] = useState({ param: "createdAt", direction: "desc" });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevFilters = useRef(filters);
  const toast = useToast();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchMaps(searchParams.toString());
      console.log(data);
      if(data?.status === "error"){
        toast({
          description: "An error occured while fetching maps",
          status: 'error',
          duration: 6000,
          isClosable: true,
        })
      }
      setLoading(false);
      setTotal(data?.total);
      setData(data?.data);
    }

    if(searchParams.toString()){
      getData();
    }
  }, [searchParams])

  useEffect(() => {
    if(JSON.stringify(prevFilters.current) !== JSON.stringify(filters)){
      setPage(1);
      prevFilters.current = filters;
    }
    let extraFilters = {};
    if(status === "authenticated" && session?.user?.id){
      extraFilters = { currentUserId: session?.user?.id }
    }
    if(myMaps) extraFilters = { ...extraFilters, authorId: session?.user?.id };
    const params = new URLSearchParams({ 
      ...filters, 
      ...sorters,
      ...extraFilters,
      page
    });  
    router.replace(pathname + "?" + params.toString());
  }, [filters, sorters, page, status, session?.user?.id, myMaps, router, pathname])

  return (
    <div className="pt-4 p-12">
      {myMaps && status !== "authenticated" ? 
      (<Loading />) : 
      (<><h1 className="text-customWhite pb-4 font-bold text-xl">
        {myMaps ? "Your published maps" : "Published maps" }
      </h1>

      <div className="grid grid-cols-6">
        <div className="col-start-1 col-end-2">
          <Filters 
            filters={filters} 
            setFilters={setFilters}
            authenticated={status === "authenticated"} 
          />
        </div>

        {loading ? 
          (<Loading />) : 
          ( data && data.length ? 
            (<div className="col-start-2 col-end-7">
              <div className="flex justify-between">
                <Sorters 
                  sorters={sorters} 
                  setSorters={setSorters} 
                />
                <h3 className="text-customWhite">
                  Showing {data.length} / {total} maps
                </h3>
              </div>
              <div className="grid grid-cols-4 gap-6 ">
                {data?.map(map => (
                  <MapContainer
                    key={map.id}
                    mapId={map.id}
                    name={map.name}
                    algorithm={map.algorithm}
                    speed={map.animationSpeed}
                    size={map.size}
                    liked={map.liked}
                    createdAt={map.createdAt}
                    authorUserName={map.authorUserName}
                    authenticated={status === "authenticated"}
                  />
                ))}
              </div>
              <div className="flex justify-center p-4">
                { data.length !== total && <Button 
                  className="text-customWhite hover:text-customBlack" 
                  colorScheme='gray' 
                  variant='outline'
                  onClick={() => setPage(page + 1)}
                >Load more</Button>}
              </div>
            </div>) : 
            <div className="text-customWhite">
              There are no saved maps
            </div>
          )}
      </div></>)}
    </div>
  )
}

export default Maps;