"use client"
import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { publishMap } from "@/app/apiRequests/maps";
import { useToast } from '@chakra-ui/react'

const Actions = ({ algorithm, mapData, mapSize, animationSpeed, session, start, target }) => {
  const [mapName, setMapName] = useState("");
  const toast = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handlePublish = async () => {
    const dataToSave = {
      name: mapName,
      mapData,
      animationSpeed,
      size: mapSize.x,
      algorithm,
      start,
      target,
      authorId: session?.user?.id
    }

    const resp = await publishMap(dataToSave);
    if(resp.error){
      toast({
        description: resp.error,
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
    } else {
      toast({
        description: "Map published successfully",
        status: 'success',
        duration: 6000,
        isClosable: true,
      })
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
            <input type="submit" value="Publish" className="bg-customYellow pl-4 pr-4 p-1.5 text-customBlack rounded-md cursor-pointer" />
            <p></p>
          </div>
        </div>
      </form>
    </>
  );
}

export default Actions;