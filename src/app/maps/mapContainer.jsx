import React, { useState } from "react";
import dayjs from "dayjs"
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";
import { algorithmOptions, animationSpeedOptions, sizeOptions } from "@/lib/configs";
import { StarIcon } from '@chakra-ui/icons'
import { modifyMapLike } from "../apiRequests/like";

const MapContainer = ({ 
  mapId, 
  name, 
  algorithm, 
  speed, 
  size, 
  author, 
  createdAt, 
  liked = false, 
  authorUserName,
  authenticated
}) => {
  const [currentLiked, setCurrentLiked] = useState(liked)
  const { data: session } = useSession();
  const router = useRouter();
  const handleLikeClick = async (e) => {
    e.stopPropagation()
    const resp = await modifyMapLike(mapId, session?.user?.id)
    console.log(resp);
    if(resp?.status === "success") {
      setCurrentLiked(!currentLiked)
    }
  }
  
  return (
    <div 
      className="bg-customWhite rounded-lg p-4 cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={() => router.push(`/map/${mapId}`)}
    >
      <div className="grid grid-cols-6 grid-rows-3">
        {/* <div className="row-start-1 row-end-4 col-start-1 col-end-7">
          Photo
        </div> */}
        <div className="row-start-1 row-end-2 col-start-1 col-end-5">
          <div className="font-bold text-xl">{name}</div>
          <div>
            <span className="text-customGray">by {authorUserName}</span>
          </div>
        </div>
        <div className="row-start-1 row-end-2 col-start-5 col-end-7">
          <div className="w-min m-auto bg-customYellow p-2 pl-6 pr-6 text-center rounded-md font-semibold">
            {algorithmOptions.find(opt => opt.value === algorithm)?.label}
          </div>
        </div>
        <div className="row-start-2 row-end-3 col-start-1 col-end-4 font-semibold">
          Animation speed: {animationSpeedOptions.find(opt => opt.value === parseFloat(speed))?.label}
        </div>
        <div className="row-start-2 row-end-3 col-start-4 col-end-7 font-semibold">
          Map size: {sizeOptions.find(opt => opt.value === size)?.label}
        </div>
        <div className="row-start-3 row-end-4 col-start-1 col-end-6">
          {dayjs(createdAt).format("DD.MM.YYYY HH:mm")}
        </div>
        {authenticated && <div className="row-start-3 row-end-4 col-start-6 col-end-7">
          { currentLiked ? 
            <StarIcon onClick={handleLikeClick} className="transition-transform duration-300 hover:scale-110" color="yellow.400" /> : 
            <StarIcon onClick={handleLikeClick} className="transition-transform duration-300 hover:scale-110" color="gray.400" 
          />}
        </div>}
      </div>
    </div>
  )
}

export default MapContainer;