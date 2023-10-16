import React from "react";

const AlgorithmMenu = ({ setAlgorithm }) => {
  return (
    <>
      <button onClick={() => setAlgorithm("dfs")} className="text-black bg-white rounded-lg text-sm p-2">DFS</button>
    </>
  );
}

export default AlgorithmMenu;