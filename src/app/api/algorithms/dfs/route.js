import { createAdjacencyList, createPath } from "@/app/helpers";
const { default: prisma } = require("@/lib/database");
const { NextResponse } = require("next/server");


const POST = async (request) => {
  try {
    const {data, size, start, target} = await request.json();
    const adjacencyList = createAdjacencyList(data, size.x, size.y);
    const visitedNodeIDs = [];
    const parrents = new Array(data.length).fill(null)

    let targetParrents;
    let targetVisitedNodes;

    const dfs = (current, graph, visited) => {
      if(visited[current]) return;
      visited[current] = true;
      visitedNodeIDs.push(current); // pievieno apmeklēto virsotņu sarakstam
      const currNeighbors = graph[current];
      for(const neighbor of currNeighbors) {
        if(!visited[neighbor]) {
          parrents[neighbor] = current;
          if(neighbor === target) {
            targetParrents = [...parrents]; // nokopē parrents masīvu brīdī, kad sastop mērķi
            targetVisitedNodes = [...visitedNodeIDs];
          }
          dfs(neighbor, graph, visited);
        }
      }
    }

    const visitedNodes = new Array(data.length).fill(false);
    dfs(start, adjacencyList, visitedNodes);
    const path = createPath(targetParrents, target);

    return NextResponse.json({ path, visitedNodes: targetVisitedNodes });
  } catch (error) {
    console.log(error);
  }
}

export {POST};