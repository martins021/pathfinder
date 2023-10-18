const { default: prisma } = require("@/lib/database");
const { NextResponse } = require("next/server");

const generateAdjacencyList = (data, colCount, rowCount) => {
  const adjList = data.map((node, i) => {
    const neighbors = [];
    if(i > colCount) neighbors.push(data[i - colCount]); // top neighbor
    if(i % colCount !== 0) neighbors.push(data[i - 1]); // left neighbor
    if(i % colCount !== colCount - 1) neighbors.push(data[i + 1]); // right neighbor
    if(i < colCount * (rowCount - 1)) neighbors.push(data[i + colCount]); // bottom neighbor
    return neighbors;
  });
  return adjList;
}

const dfs = (start, graph) => {
  const visitedNodes = new Array(graph.length).fill(false);

}

export async function POST(request) {
  try {
    const {data, size, start, target} = await request.json();
    const adjacencyList = generateAdjacencyList(data, size.x, size.y);
    dfs(start, adjacencyList);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log(error);
  }
}