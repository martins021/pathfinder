const { default: createAdjacencyList } = require("@/lib/createAdjacencyList");
const { NextResponse } = require("next/server");

const createPath = (parrents, node) => {
  if(parrents[node] === null) return [node]; // ja nākamā virsotne ir null, tad tas ir sākums
  return createPath(parrents, parrents[node]).concat(node);
}

const bfs = (start, target, graph) => {
  const visitedNodes = new Array(graph.length).fill(false);
  const parrents = new Array(graph.length).fill(null); // ceļš no sākuma virsotnes līdz katrai apmeklētajai virsotnei
  
  const queue = [start];
  visitedNodes[start] = true;
  let targetFound = false;

  while(queue.length && targetFound === false){
    const currNode = queue.shift();
    const currNeighbors = graph[currNode]; // iegūst kaimiņus no grafa

    for (let i = 0; i < currNeighbors.length; i++) {
      if(!visitedNodes[currNeighbors[i]]){
        queue.push(currNeighbors[i]); // ieliek rindā kaimiņus
        visitedNodes[currNeighbors[i]] = true;
        parrents[currNeighbors[i]] = currNode; // pašreizējo node ieraksta kā kaimiņa vecāku
        if(currNeighbors[i] === target){
          targetFound = true;
          break;
        }
      }
    }
  }
  const path = createPath(parrents, target);
  return path;
}

const POST = async (request) => {
  try {
    const {data, size, start, target} = await request.json();
    const adjacencyList = createAdjacencyList(data, size.x, size.y);
    console.log("Adjacency list: ", adjacencyList);
    const path = bfs(start, target, adjacencyList)

    return NextResponse.json({ path })
  } catch (error) {
    console.log(error);
  }
}

export {POST};