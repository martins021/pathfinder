import { 
  FaLocationDot, 
  FaFlagCheckered, 
  FaRoadBarrier,
  FaMountain,
  FaEraser
} from "react-icons/fa6";

export const initialSettings = {
  nodeSize: 35,
  size: {},
  algorithm: "bfs",
  tool: "start",
  brushSize: 3,
  brushMode: 1
};

export const speedOptions = [
  { label: "0.25x", value: 5 },
  { label: "0.5x", value: 10 },
  { label: "1x", value: 20 },
  { label: "2x", value: 40 },
  { label: "4x", value: 80 },
]

export const toolOptions = [
  {
    label: "Start",
    value: "start",
    description: "Sets starting node",
    icon: <FaLocationDot size={20}/>,
  },
  {
    label: "Target",
    value: "target",
    description: "Sets target node",
    icon: <FaFlagCheckered size={20}/>,
  },
  {
    label: "Wall",
    value: "wall",
    description: "Creates a wall node",
    icon: <FaRoadBarrier size={20}/>,
  },
  {
    label: "Terrain",
    value: "terrain",
    description: "Creates custom terrain",
    icon: <FaMountain size={20}/>,
  },
  {
    label: "Clear",
    value: "empty",
    description: "Sets node to empty",
    icon: <FaEraser size={20}/>,
  },
];

export const algorithmOptions = [
  {
    label: "BFS",
    value: "bfs",
    description: "Searches outward evenly; finds nearest solution first."
  },
  {
    label: "DFS",
    value: "dfs",
    description: "Explores as far as possible along each branch before backtracking."
  },
  {
    label: "Dijkstra",
    value: "dijkstra",
    description: "Finds the shortest path between nodes when travel costs vary."
  },
  // {
  //   label: "A*",
  //   value: "aStar"
  // },
  // {
  //   label: "Bellman-Ford",
  //   value: "bellmanFord"
  // }
]

export const elevationColors = [
  "rgb(229, 229, 229)",  // gray to green
  "rgb(227, 230, 225)",
  "rgb(224, 231, 222)",
  "rgb(221, 231, 218)",
  "rgb(219, 232, 215)",
  "rgb(216, 233, 211)",
  "rgb(214, 234, 208)",
  "rgb(211, 235, 204)",
  "rgb(208, 235, 200)",
  "rgb(206, 236, 197)",
  "rgb(203, 237, 193)",
  "rgb(200, 237, 190)",
  "rgb(197, 238, 186)",
  "rgb(194, 239, 182)",
  "rgb(191, 240, 179)",
  "rgb(188, 240, 175)",
  "rgb(185, 241, 172)",
  "rgb(182, 242, 168)",
  "rgb(179, 242, 164)",
  "rgb(176, 243, 161)",
  "rgb(172, 243, 157)",
  "rgb(169, 244, 153)",
  "rgb(166, 245, 149)",
  "rgb(162, 245, 146)",
  "rgb(159, 246, 142)",
  "rgb(155, 246, 138)",
  "rgb(151, 247, 134)",
  "rgb(147, 247, 130)",
  "rgb(143, 248, 126)",
  "rgb(139, 248, 122)",
  "rgb(135, 249, 118)",
  "rgb(131, 249, 114)",
  "rgb(126, 250, 110)",
  
  
  "rgb(126, 250, 110)", // green to yellow
  "rgb(131, 250, 109)",
  "rgb(137, 250, 108)",
  "rgb(142, 250, 107)",
  "rgb(146, 250, 106)",
  "rgb(151, 249, 105)",
  "rgb(156, 249, 105)",
  "rgb(160, 249, 104)",
  "rgb(164, 249, 103)",
  "rgb(168, 249, 103)",
  "rgb(173, 249, 102)",
  "rgb(177, 249, 102)",
  "rgb(180, 248, 102)",
  "rgb(184, 248, 101)",
  "rgb(188, 248, 101)",
  "rgb(192, 248, 101)",
  "rgb(195, 248, 101)",
  "rgb(199, 247, 101)",
  "rgb(202, 247, 101)",
  "rgb(206, 247, 102)",
  "rgb(209, 247, 102)",
  "rgb(212, 247, 102)",
  "rgb(215, 246, 103)",
  "rgb(219, 246, 103)",
  "rgb(222, 246, 104)",
  "rgb(225, 246, 104)",
  "rgb(228, 245, 105)",
  "rgb(231, 245, 106)",
  "rgb(234, 245, 106)",
  "rgb(237, 245, 107)",
  "rgb(239, 244, 108)",
  "rgb(242, 244, 109)",
  "rgb(245, 244, 110)",
  

  "rgb(245, 244, 110)", // yellow to red
  "rgb(247, 240, 107)",
  "rgb(249, 236, 104)",
  "rgb(251, 231, 102)",
  "rgb(253, 227, 99)",
  "rgb(255, 223, 97)",
  "rgb(255, 219, 96)",
  "rgb(255, 215, 94)",
  "rgb(255, 210, 93)",
  "rgb(255, 206, 92)",
  "rgb(255, 202, 91)",
  "rgb(255, 198, 90)",
  "rgb(255, 194, 90)",
  "rgb(255, 189, 90)",
  "rgb(255, 185, 90)",
  "rgb(255, 181, 90)",
  "rgb(255, 177, 91)",
  "rgb(255, 173, 91)",
  "rgb(255, 169, 92)",
  "rgb(255, 165, 93)",
  "rgb(255, 161, 94)",
  "rgb(255, 157, 95)",
  "rgb(255, 153, 96)",
  "rgb(255, 149, 97)",
  "rgb(255, 145, 98)",
  "rgb(255, 141, 100)",
  "rgb(255, 137, 101)",
  "rgb(255, 133, 102)",
  "rgb(253, 130, 104)",
  "rgb(251, 126, 105)",
  "rgb(249, 123, 107)",
  "rgb(247, 119, 108)",
  "rgb(245, 116, 110)",
  "rgb(245, 116, 110)",
  ]