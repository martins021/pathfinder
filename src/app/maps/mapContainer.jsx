import React from "react";
import dayjs from "dayjs"

const MapContainer = ({ id, name, algorithm, speed, size, author, createdAt }) => {
  return (
    <div className="bg-customWhite rounded-lg p-4 cursor-pointer transition-transform duration-300 hover:scale-105">
      <div className="grid grid-cols-6 grid-rows-6">
        <div className="row-start-1 row-end-4 col-start-1 col-end-7">
          Photo
        </div>
        <div className="row-start-4 row-end-5 col-start-1 col-end-5">
          {name}
        </div>
        <div className="row-start-4 row-end-5 col-start-5 col-end-7">
          <div className="w-min m-auto bg-customYellow p-2 pl-4 pr-4 text-center rounded-md">
            {algorithm}
          </div>
        </div>
        <div className="row-start-5 row-end-6 col-start-1 col-end-5">
          Animation speed: {speed}
        </div>
        <div className="row-start-6 row-end-7 col-start-1 col-end-5">
          Size: size
        </div>
        <div className="row-start-6 row-end-7 col-start-5 col-end-7">
          {dayjs(createdAt).format("DD.MM.YYYY HH:mm")}
        </div>
      </div>
    </div>
  )
}

export default MapContainer;