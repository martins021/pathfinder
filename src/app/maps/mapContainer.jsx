import React from "react";
import dayjs from "dayjs"
import { algorithmOptions, animationSpeedOptions, sizeOptions } from "@/lib/configs";

const MapContainer = ({ id, name, algorithm, speed, size, author, createdAt }) => {
  return (
    <div className="bg-customWhite rounded-lg p-4 cursor-pointer transition-transform duration-300 hover:scale-105">
      <div className="grid grid-cols-6 grid-rows-3">
        {/* <div className="row-start-1 row-end-4 col-start-1 col-end-7">
          Photo
        </div> */}
        <div className="row-start-1 row-end-2 col-start-1 col-end-5 font-bold text-xl">
          {name}
        </div>
        <div className="row-start-1 row-end-2 col-start-5 col-end-7">
          <div className="w-min m-auto bg-customYellow p-2 pl-8 pr-8 text-center rounded-md font-semibold">
            {algorithmOptions.find(opt => opt.value === algorithm)?.label}
          </div>
        </div>
        <div className="row-start-2 row-end-3 col-start-1 col-end-4 font-semibold">
          Animation speed: {animationSpeedOptions.find(opt => opt.value === parseFloat(speed))?.label}
        </div>
        <div className="row-start-2 row-end-3 col-start-4 col-end-7 font-semibold">
          Map size: {sizeOptions.find(opt => opt.value === size)?.label}
        </div>
        <div className="row-start-3 row-end-4 col-start-1 col-end-7">
          {dayjs(createdAt).format("DD.MM.YYYY HH:mm")}
        </div>
      </div>
    </div>
  )
}

export default MapContainer;