import { 
  createAdjacencyList, 
  createPath,
  getStartAndTargetNodes,
  validatePayload
} from "@/app/helpers";
const { NextResponse } = require("next/server");

const POST = async (request) => {
  try {
    const {data, size} = await request.json();
    validatePayload(data, size);
    const { start, target } = getStartAndTargetNodes(data);
    const adjacencyList = createAdjacencyList(data, size.x, size.y);
    const visitedNodeIDs = [];
    const parents = new Array(data.length).fill(null)

    let targetparents;
    let finalVisitedNodes;
    let targetFound = false;

    const dfs = (current, graph, visited) => {
      if(visited[current]) return;
      visited[current] = true;
      visitedNodeIDs.push(current); // pievieno apmeklēto virsotņu sarakstam
      const currNeighbors = graph[current];
      for(const neighbor of currNeighbors) {
        if(!visited[neighbor]) {
          parents[neighbor] = current;
          if(neighbor === target) {
            targetFound = true;
            targetparents = [...parents]; // nokopē parents masīvu brīdī, kad sastop mērķi
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
      path = createPath(targetparents, target);
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