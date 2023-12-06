"use client"
import React from "react";
import { useSession } from "next-auth/react";
import Maps from "../mapsPage";

const ExploreMaps = () => {
  const { data: session } = useSession();

  return (
    <Maps userId={session?.user?.id} />
  )
}

export default ExploreMaps;