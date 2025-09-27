const getMapSize = (NODE_SIZE) => {
  const h = document.getElementById("map").offsetHeight
  const w = document.getElementById("map").offsetWidth

  const width = Math.floor(w / NODE_SIZE)
  const height = Math.floor(h / NODE_SIZE)
  
  return { x: width, y: height }
}

export const settingsReducer = (state, action) => {
  const { type, value } = action;
  switch (type) {
    case "size":
      const newMapSize = getMapSize(value)
      return { 
        ...state, 
        nodeSize: value,
        size: newMapSize 
      }
    case "algorithm":
      return { ...state, algorithm: value }
    case "tool":
      return { ...state, tool: value }
    case "animationSpeed":
      return { ...state, animationSpeed: value }
    case "brushSize":
      return { ...state, brushSize: value }
    case "brushMode":
      return { ...state, brushMode: value }
    default:
      return state
  }
}

const getWeight = (nodeTo, nodeFrom) => {
  if(nodeFrom > nodeTo){ // going from higher elevation to lower
    return 200 + 15 * (Math.abs(nodeTo - nodeFrom) + 1);
  } else if (nodeFrom < nodeTo) { // going from lower elevation to higher
    return 200 + 50 * (Math.abs(nodeTo - nodeFrom) + 1);
  } else {
    return 200; // no elevation change
  }
}

export const createAdjacencyList = (data, colCount, rowCount, weighted = false) => {
  if(!data || !Array.isArray(data) || !colCount || !rowCount) {
    throw new Error("Invalid data");
  }

  const adjList = data.map((node, i) => {
    const neighbors = []; // holds indices of neighboring nodes
    if(node.state === "wall") return neighbors; // wall nodes have no neighbors
    if(i > colCount - 1)  { // top neighbor
      if(weighted){
        neighbors.push({
          nodeId: i - colCount,
          weight: getWeight(data[i - colCount].elev, node.elev)
        })
      } else {
        neighbors.push(i - colCount);
      }
    } 
    if(i % colCount !== 0) {  // left neighbor
      if(weighted){
        neighbors.push({
          nodeId: i - 1,
          weight: getWeight(data[i - 1].elev, node.elev)
        })
      } else {
        neighbors.push(i - 1);
      }
    }
    if(i % colCount !== colCount - 1) { // right neighbor
      if(weighted){
        neighbors.push({
          nodeId: i + 1,
          weight: getWeight(data[i + 1].elev, node.elev)
        })
      } else {
        neighbors.push(i + 1);
      }
    } 
    if(i < colCount * (rowCount - 1)) { // bottom neighbor
      if(weighted){
        neighbors.push({
          nodeId: i + colCount,
          weight: getWeight(data[i + colCount].elev, node.elev)
        })
      } else {
        neighbors.push(i + colCount);
      }
    } 
    return neighbors;
  });
  return adjList;
}

export const createPath = (parrents, node) => {
  if(parrents[node] === null) return [node]; // ja nākamā virsotne ir null, tad tas ir sākums
  return createPath(parrents, parrents[node]).concat(node);
}

export const validateStartAndTargetNodes = (start, target) => {
  if(!start && !target) {
    const error = new Error("Start and target nodes not specified");
    error.status = 400;
    throw error;
  } else if(!start) {
    const error = new Error("Start node not specified");
    error.status = 400;
    throw error;
  } else if (!target) {
    const error = new Error("Target node not specified");
    error.status = 400;
    throw error;
  }
}