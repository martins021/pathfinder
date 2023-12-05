"use client"
import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { publishMap } from "@/app/apiRequests/maps";

const Actions = ({ algorithm, mapData, mapSize, animationSpeed, session }) => {
  const [mapName, setMapName] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handlePublish = async () => {
    try {
      const dataToSave = {
        name: mapName,
        mapData,
        animationSpeed,
        size: mapSize.x,
        algorithm,
        authorId: session?.user?.id
      }
      console.log({ dataToSave });
      await publishMap(dataToSave);
    } catch (error) {
      console.log("ERROR SAVING: ", error);
    }
  }

  useEffect(() => {
    const { x, y } = mapSize;
    const newMapName = `${algorithm} ${x}x${y}`
    setMapName(newMapName.charAt(0).toUpperCase() + newMapName.slice(1))
  }, [algorithm, mapSize])

  return (
    <>
      <form onSubmit={handleSubmit(handlePublish)}>
        <div className="flex gap justify-around">
          <div>
            <input  
              { 
                ...register("mapName", 
                { required: true, maxLength: 30 }) 
              }
              placeholder="Map name"
              defaultValue={mapName} 
              className="rounded-md p-1.5 bg-customHoverGray focus:outline-none focus:border-customViolet focus:ring-1 focus:ring-customViolet border-2 transition-colors duration-300"
            />
            { errors.mapName?.type === 'required' && <p className="text-customRed">This field is required</p> }
            { errors.mapName?.type === 'maxLength' &&  <p className="text-customRed">Name is too long</p> }
          </div>
          <div>
            <input type="submit" value="Save" className="bg-mainBtn pl-4 pr-4 p-1.5 text-customWhite rounded-md cursor-pointer" />
            <p></p>
          </div>
        </div>
      </form>
    </>
  );
}

export default Actions;