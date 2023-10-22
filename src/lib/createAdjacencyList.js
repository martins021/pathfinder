const createAdjacencyList = (data, colCount, rowCount) => {
  const adjList = data.map((node, i) => {
    const neighbors = []; // holds indices of neighboring nodes
    if(node.state === "wall") return neighbors; // wall nodes have no neighbors
    if(i > colCount - 1) neighbors.push(i - colCount); // top neighbor
    if(i % colCount !== 0) neighbors.push(i - 1); // left neighbor
    if(i % colCount !== colCount - 1) neighbors.push(i + 1); // right neighbor
    if(i < colCount * (rowCount - 1)) neighbors.push(i + colCount); // bottom neighbor
    return neighbors;
  });
  return adjList;
}

export default createAdjacencyList;