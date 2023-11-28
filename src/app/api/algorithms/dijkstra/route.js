const { createAdjacencyList, createPath } = require("@/app/helpers");
const { NextResponse } = require("next/server");

const POST = async (request) => {
  try {
    const {data, size, start, target} = await request.json();
    const adjacencyList = createAdjacencyList(data, size.x, size.y, true);
    const nodeCount = adjacencyList.length;
    const parrents = new Array(nodeCount).fill(null);
    const distance = new Array(nodeCount).fill(Infinity);
    const visitedNodeIDs = [];
    const unexploredNodes = Array.from({length: nodeCount}, (_, index) => index);

    distance[start] = 0;
    console.log(adjacencyList);

    while(unexploredNodes.length) {
      const node = unexploredNodes.sort((a, b) => distance[a] - distance[b])[0]; // get node with smallest distance
      unexploredNodes.splice(unexploredNodes.indexOf(node), 1) // remove node from unexploredNodes
      visitedNodeIDs.push(node); // add node to visitedNodes
      if(node === target) break;
      
      const currNeighbors = adjacencyList[node]; // get neighbors of node
      for (let i = 0; i < currNeighbors.length; i++) {
        const newDistance = distance[node] + currNeighbors[i].weight; // calculate new distance to neighbor
        if(newDistance < distance[currNeighbors[i].nodeId]){ // if new distance is smaller than current distance update distance and parrent
          distance[currNeighbors[i].nodeId] = newDistance;
          parrents[currNeighbors[i].nodeId] = node;
        }
      }
    }

    const path = createPath(parrents, target);

    return NextResponse.json({ path, visitedNodes: visitedNodeIDs });
  } catch (error) {
    console.log("DFS error: ", error);
    return NextResponse.error(500, "Error executing Dijsktra's algorithm")
  }
}

export { POST }