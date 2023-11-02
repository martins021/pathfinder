import { createAdjacencyList, createPath } from "@/app/helpers";
const { NextResponse } = require("next/server");

const bfs = (start, target, graph) => {
  const visitedNodes = new Array(graph.length).fill(false);
  const parrents = new Array(graph.length).fill(null); // ceļš no sākuma virsotnes līdz katrai apmeklētajai virsotnei
  
  const queue = [start];
  visitedNodes[start] = true;
  let targetFound = false;
  const visitedNodeIDs = []

  while(queue.length && targetFound === false){
    const currNode = queue.shift();
    const currNeighbors = graph[currNode]; // iegūst kaimiņus no grafa

    for (let i = 0; i < currNeighbors.length; i++) {
      if(!visitedNodes[currNeighbors[i]]){
        queue.push(currNeighbors[i]); // ieliek rindā kaimiņus
        visitedNodes[currNeighbors[i]] = true;
        visitedNodeIDs.push(currNeighbors[i]);
        parrents[currNeighbors[i]] = currNode; // pašreizējo node ieraksta kā kaimiņa vecāku
        if(currNeighbors[i] === target){
          targetFound = true;
          break;
        }
      }
    }
  }
  const path = createPath(parrents, target);

  return { path, visitedNodes: visitedNodeIDs};
}

const POST = async (request) => {
  try {
    const {data, size, start, target} = await request.json();
    const adjacencyList = createAdjacencyList(data, size.x, size.y);
    console.log("Adjacency list: ", adjacencyList);
    const { path, visitedNodes } = bfs(start, target, adjacencyList)

    return NextResponse.json({ path, visitedNodes })
  } catch (error) {
    console.log(error);
  }
}

export {POST};