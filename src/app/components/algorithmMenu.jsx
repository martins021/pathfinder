import React from "react";
import AlgorithmBtn from "./buttons/algorithmBtn";

const menuStyle ={
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: ".5vw",
}

const AlgorithmMenu = ({ algorithm, setAlgorithm }) => {
  return (
    <div style={menuStyle}>
      <AlgorithmBtn 
        onClick={() => setAlgorithm("bfs")} 
        title={"BFS"}
        selected={algorithm === "bfs"}
      />    
      <AlgorithmBtn 
        onClick={() => setAlgorithm("dfs")} 
        title={"DFS"}
        selected={algorithm === "dfs"}
      />
      <AlgorithmBtn 
        onClick={() => setAlgorithm("dijkstra")} 
        title={"Dijkstra"}
        selected={algorithm === "dijkstra"}
      />
      <AlgorithmBtn 
        onClick={() => setAlgorithm("aStar")} 
        title={"A*"}
        selected={algorithm === "aStar"}
      />
      <AlgorithmBtn 
        onClick={() => setAlgorithm("bellmanFord")} 
        title={"Bellman-Ford"}
        selected={algorithm === "bellmanFord"}
      />
    </div>
  );
}

export default AlgorithmMenu;