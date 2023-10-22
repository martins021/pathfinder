import createAdjacencyList from "@/lib/createAdjacencyList";
const { default: prisma } = require("@/lib/database");
const { NextResponse } = require("next/server");


const POST = async (request) => {
  try {
    const {data, size, start, target} = await request.json();
    const adjacencyList = createAdjacencyList(data, size.x, size.y);
    const result = [];

    const dfs = (current, graph, visited) => {
      if(visited[current]) return;
      visited[current] = true;
      result.push(current);  
      const currNeighbors = graph[current];
      for(const neighbor of currNeighbors) {
        dfs(neighbor, graph, visited);
      }
    }

    const visitedNodes = new Array(data.length).fill(false);
    dfs(start, adjacencyList, visitedNodes);

    return NextResponse.json({ result });
  } catch (error) {
    console.log(error);
  }
}

export {POST};