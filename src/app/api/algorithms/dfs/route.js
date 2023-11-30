import { 
  createAdjacencyList, 
  createPath,
  validateStartAndTargetNodes
} from "@/app/helpers";
const { default: prisma } = require("@/lib/database");
const { NextResponse } = require("next/server");


const POST = async (request) => {
  try {
    const {data, size, start, target} = await request.json();
    validateStartAndTargetNodes(start, target);
    const adjacencyList = createAdjacencyList(data, size.x, size.y);
    const visitedNodeIDs = [];
    const parrents = new Array(data.length).fill(null)

    let targetParrents;
    let finalVisitedNodes;
    let targetFound = false;

    const dfs = (current, graph, visited) => {
      if(visited[current]) return;
      visited[current] = true;
      visitedNodeIDs.push(current); // pievieno apmeklēto virsotņu sarakstam
      const currNeighbors = graph[current];
      for(const neighbor of currNeighbors) {
        if(!visited[neighbor]) {
          parrents[neighbor] = current;
          if(neighbor === target) {
            targetFound = true;
            targetParrents = [...parrents]; // nokopē parrents masīvu brīdī, kad sastop mērķi
            finalVisitedNodes = [...visitedNodeIDs];
          }
          dfs(neighbor, graph, visited);
        }
      }
    }

    const visitedNodes = new Array(data.length).fill(false);
    dfs(start, adjacencyList, visitedNodes);
    
    let path = [];
    if(targetFound){
      path = createPath(targetParrents, target);
    } else {
      finalVisitedNodes = [...visitedNodeIDs];
    }

    const precentageVisited = (finalVisitedNodes.length / adjacencyList.length) * 100;
    return NextResponse.json({ 
      targetFound,
      precentageVisited,
      name: "DFS",
      path, 
      visitedNodes: finalVisitedNodes 
    });
  } catch (error) {
    console.log("DFS error: ", error);
    return NextResponse.json({ error: error.message }, { status: error.status || 500 })
  }
}

export {POST};