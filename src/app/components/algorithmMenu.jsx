import React from "react";

const AlgorithmMenu = ({ setAlgorithm }) => {
  return (
    <>
      <button onClick={() => setAlgorithm("dfs")} className="text-black bg-white rounded-lg text-sm p-2">DFS</button>
      <button onClick={() => setAlgorithm("bfs")} className="text-black bg-white rounded-lg text-sm p-2">BFS</button>
    </>
  );
}

export default AlgorithmMenu;