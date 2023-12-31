"use client"
import React, { useEffect, useState, useRef, useCallback } from "react";
import styles from "../styles/main.module.css"
import Controls from "../components/map/controls";
import Map from "../components/map/map";
import Actions from "../components/map/actions";
import AlgorithmMenu from "../components/map/algorithmMenu";
import { useSession } from "next-auth/react";
import { launchBfs, launchDfs, launchDijkstra } from "../apiRequests/algorithms";
import { useToast } from '@chakra-ui/react'
import CommentForm from "../components/forms/newComment";
import CommentSection from "../components/commentSection";
import { getComments } from "../apiRequests/comment";

const PlayGround = ({ 
  mapId = "new",
  initialMapSize = { x: 40, y: 23 },
  inintialMapData = [],
  initialAnimationSpeed = 0.03,
  initialAlgorithm = "bfs",
  initialStart = null,
  initialTarget = null
 }) => {
  const { data: session, status } = useSession();
  const [tool, setTool] = useState('start')
  const [algorithm, setAlgorithm] = useState(initialAlgorithm)
  const [result, setResult] = useState({}) // result of the algorithm
  const [mapSize, setMapSize] = useState(initialMapSize);
  const [mapData, setMapData] = useState(inintialMapData);
  const [start, setStart] = useState(initialStart); // start node
  const [target, setTarget] = useState(initialTarget); // target node
  const [animationSpeed, setAnimationSpeed] = useState(initialAnimationSpeed)
  const [animate, setAnimate] = useState(false) // indicates if the animation is running
  const [brushSize, setBrushSize] = useState(3)
  const [brushMode, setBrushMode] = useState(1);
  const [comments, setComments] = useState([])
  const [skipComments, setSkipComments] = useState(0)
  const [totalComments, setTotalComments] = useState(0)
  const [loadingComments, setLoadingComments] = useState(false)
  const animationId = useRef(0) // used to cancel animation 
  const toast = useToast();

  const createMap = () => {
    const startX = Math.floor(mapSize.x / 3);
    const startY = Math.floor(mapSize.y / 2);
    const targetX = Math.floor(mapSize.x / 3 * 2) + 1;
    const targetY = Math.floor(mapSize.y / 2);

    setAnimate(false)
    animationId.current += 1
    const data = []
    for (let y = 0; y < mapSize.y; y++) {
      for (let x = 0; x < mapSize.x; x++) {
        if(x % mapSize.x === startX && y % mapSize.y   === startY){
          data.push({ x, y, state: "start", prevState: "empty", elev: 1 })
        } else if(x % mapSize.x === targetX && y % mapSize.y === targetY){
          data.push({ x, y, state: "target", prevState: "empty", elev: 1 })
        } else {
          data.push({ x, y, state: "empty", prevState: "empty", elev: 1 })
        }
      }
    }
    setMapData(data)
    setStart(startY * mapSize.x + startX);
    setTarget(targetY * mapSize.x + targetX);
  }

  const clearPath = () => {
    setAnimate(false)
    animationId.current += 1
    const withoutPath = mapData.map(node => {
      if(node.state === 'visited' || node.state === 'path'){
        return ({
          ...node, 
          state: 'empty'
        });
      } 
      return node;
    })

    setMapData(withoutPath);
  }

  const launchAlgorithm = async () => {
    clearPath();
    animationId.current += 1
    let resp;
    switch (algorithm) {
      case "dfs":
        resp = await launchDfs(mapData, mapSize, start, target);
        break;
      case "bfs":
        resp = await launchBfs(mapData, mapSize, start, target);
        break;
      case "dijkstra":
        resp = await launchDijkstra(mapData, mapSize, start, target);
        break;
      default:
        break;
    }
    
    if(resp.error){
      toast({
        description: resp.error,
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
    }
    setResult(resp)
  }

  useEffect(() => {
    if(mapId === "new"){
      createMap()
    }
  }, [mapSize])

  const fetchComments = useCallback(
    async () => {
      setLoadingComments(true)
      const resp = await getComments(mapId, skipComments)
      if(!resp || resp.error){
        toast({
          title: "Failed to get comments",
          status: 'error',
          duration: 6000,
          isClosable: true,
        })
      } else {
        setComments(prev => [...prev, ...resp.data])
        setTotalComments(resp.total)
        setSkipComments(prev => prev + resp.data.length)
      }
      setLoadingComments(false)
    }, [mapId, skipComments]
  ) 
  
  return (
    <>
      {session && mapId && mapId !== "new" && 
      <CommentForm 
        mapId={mapId} 
        userId={session?.user?.id}
        userName={session?.user?.name} 
        comments={comments}
        setComments={setComments}
        setSkipComments={setSkipComments}
        setTotalComments={setTotalComments}
      />}
      
      <div className={styles.mainGrid} >
        <div className={styles.actionsTile}>
          {status === "authenticated" && <Actions 
            algorithm={algorithm}
            mapData={mapData}
            setMapData={setMapData}
            mapSize={mapSize}
            animationSpeed={animationSpeed}
            session={session}
            start={start}
            target={target}
          />}
        </div>
        <div className={styles.launchBtn}>
          <button 
            onClick={launchAlgorithm} 
            className="text-black bg-customWhite rounded-lg text-sm p-3 pl-10 pr-10 font-bold 
                      hover:bg-customRed hover:text-customWhite transition-all duration-300"
          >
            Launch
          </button>
        </div>
        <div className={styles.mapTile}>
          <Map 
            tool={tool}
            result={result} 
            mapData={mapData}
            mapSize={mapSize}
            brushSize={brushSize}
            brushMode={brushMode}
            animationSpeed={animationSpeed}
            animate={animate}
            animationId={animationId}
            setMapData={setMapData}
            setStart={setStart}
            setTarget={setTarget}
            clearPath={clearPath}
            setAnimate={setAnimate}
          />
        </div>
        <div className={styles.controlsTile}>
          <Controls 
            tool={tool} 
            setTool={setTool} 
            mapSize={mapSize}
            setMapSize={setMapSize}
            createMap={createMap}
            clearPath={clearPath}
            setAnimationSpeed={setAnimationSpeed}
            setBrushSize={setBrushSize}
            brushMode={brushMode}
            setBrushMode={setBrushMode}
            animationInProgress={animate}
            initialAnimationSpeed={initialAnimationSpeed}
            initialMapSize={initialMapSize}
          />
        </div>
        <div className={styles.results}>
          {Object.keys(result).length ?
            <div className="flex flex-col gap-4">
              <p>Visited nodes: {result.visitedNodes?.length}</p>
              <p>Path length: {result.path?.length}</p>
              <p>Visited precentage: {result.precentageVisited?.toFixed(2)}%</p>
            </div>
          : <p>Launch an algorithm to see visualization</p>}
        </div>
        <div className={styles.algorithmsTile}>
          <AlgorithmMenu 
            algorithm={algorithm}
            setAlgorithm={setAlgorithm} 
          />
        </div>
      </div>

      {session && mapId && mapId !== "new" && 
      <CommentSection 
        comments={comments}
        fetchComments={fetchComments}
        loading={loadingComments}
        totalComments={totalComments}
      />}

    </>
  )
}

export default PlayGround;