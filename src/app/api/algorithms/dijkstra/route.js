const { 
  createAdjacencyList, 
  createPath,
  validateStartAndTargetNodes
} = require("@/app/helpers");
const { NextResponse } = require("next/server");

const POST = async (request) => {
  try {
    const {data, size, start, target} = await request.json();
    validateStartAndTargetNodes(start, target);

    const adjacencyList = createAdjacencyList(data, size.x, size.y, true);
    const nodeCount = adjacencyList.length;
    const parrents = new Array(nodeCount).fill(null);
    const distance = new Array(nodeCount).fill(Infinity);
    const visitedNodeIDs = [];
    const unexploredNodes = Array.from({length: nodeCount}, (_, index) => index);

    let targetFound = false;
    distance[start] = 0;

    while(unexploredNodes.length) {
      const filteredNodes = unexploredNodes.filter(node => distance[node] !== Infinity); // get only reachable nodes
      if(!filteredNodes.length) break; // all remaining nodes are unreachable, therefore graph is disconnected and target cannot be found

      const node = unexploredNodes.sort((a, b) => distance[a] - distance[b])[0]; // get node with smallest distance
      unexploredNodes.splice(unexploredNodes.indexOf(node), 1) // remove node from unexploredNodes
      visitedNodeIDs.push(node); // add node to visitedNodes
      
      if(node === target){
        targetFound = true;
        break;
      }
      
      const currNeighbors = adjacencyList[node]; // get neighbors of node
      for (let i = 0; i < currNeighbors.length; i++) {
        const newDistance = distance[node] + currNeighbors[i].weight; // calculate new distance to neighbor
        if(newDistance < distance[currNeighbors[i].nodeId]){ // if new distance is smaller than current distance update distance and parrent
          distance[currNeighbors[i].nodeId] = newDistance;
          parrents[currNeighbors[i].nodeId] = node;
        }
      }
    }

    let path = [];
    if(targetFound){
      path = createPath(parrents, target);
    }

    const precentageVisited = (visitedNodeIDs.length / adjacencyList.length) * 100;
    return NextResponse.json({ 
      targetFound,
      precentageVisited,
      name: "Dijkstra",
      path, 
      visitedNodes: visitedNodeIDs 
    });
  } catch (error) {
    console.log("Dijkstra error: ", error);
    return NextResponse.json({ error: error.message }, { status: error.status || 500 })
  }
}

export { POST }