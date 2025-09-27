export const initialSettings = {
  nodeSize: 35,
  size: {},
  algorithm: "bfs",
  tool: "start",
  animationSpeed: 0.03,
  brushSize: 3,
  brushMode: 1
};

export const animationSpeedOptions = [
  {
    label: 1,
    value: 0.0768
  },
  {
    label: 2,
    value: 0.048
  },
  {
    label: 3,
    value: 0.03
  },
  {
    label: 4,
    value: 0.012
  },
  {
    label: 5,
    value: 0.0048
  }
]

export const toolOptions = [
  {
    label: "Start",
    value: "start",
    description: "Sets starting node"
  },
  {
    label: "Target",
    value: "target",
    description: "Sets target node"
  },
  {
    label: "Wall",
    value: "wall",
    description: "Creates a wall node"
  },
  {
    label: "Terrain",
    value: "terrain",
    description: "Creates custom terrain"
  },
  {
    label: "Clear",
    value: "empty",
    description: "Sets node to empty"
  }
]

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

export const sortingOptions = [
  {
    label: "Creation date",
    value: "createdAt"
  },
  {
    label: "Name",
    value: "name"
  },
  {
    label: "Algorithm",
    value: "algorithm"
  },
  {
    label: "Animation speed",
    value: "animationSpeed"
  },
  {
    label: "Map size",
    value: "size"
  }
]

export const elevationColors = [
  "rgb(102, 19, 255)", // violet to dark blue
  "rgb(102, 19, 255)",
  "rgb(100, 29, 255)",
  "rgb(98, 36, 255)",
  "rgb(96, 42, 255)",
  "rgb(94, 47, 255)",
  "rgb(93, 52, 255)",
  "rgb(91, 56, 255)",
  "rgb(89, 61, 255)",
  "rgb(88, 64, 255)",
  "rgb(86, 68, 255)",
  "rgb(85, 71, 255)",
  "rgb(84, 75, 255)",
  "rgb(83, 78, 255)",
  "rgb(82, 81, 255)",
  "rgb(81, 84, 255)",
  "rgb(80, 87, 255)",
  "rgb(79, 89, 255)",
  "rgb(79, 92, 255)",
  "rgb(79, 95, 255)",
  "rgb(79, 97, 255)",
  "rgb(79, 100, 255)",
  "rgb(79, 102, 255)",
  "rgb(79, 104, 255)",
  "rgb(79, 107, 255)",
  "rgb(80, 109, 255)",
  "rgb(81, 111, 254)",
  "rgb(81, 113, 254)",
  "rgb(82, 116, 253)",
  "rgb(84, 118, 252)",
  "rgb(85, 120, 251)",
  "rgb(86, 122, 251)",
  "rgb(87, 124, 250)",
  "rgb(89, 126, 249)",


  "rgb(89, 126, 249)", // dark blue to light blue
  "rgb(75, 132, 253)",
  "rgb(57, 137, 255)",
  "rgb(32, 142, 255)",
  "rgb(0, 147, 255)",
  "rgb(0, 152, 255)",
  "rgb(0, 157, 255)",
  "rgb(0, 162, 255)",
  "rgb(0, 166, 255)",
  "rgb(0, 171, 255)",
  "rgb(0, 175, 255)",
  "rgb(0, 179, 255)",
  "rgb(0, 184, 255)",
  "rgb(0, 188, 255)",
  "rgb(0, 191, 255)",
  "rgb(0, 195, 255)",
  "rgb(0, 199, 255)",
  "rgb(0, 203, 255)",
  "rgb(0, 206, 255)",
  "rgb(0, 210, 255)",
  "rgb(0, 213, 255)",
  "rgb(0, 217, 255)",
  "rgb(0, 220, 254)",
  "rgb(0, 223, 252)",
  "rgb(0, 227, 250)",
  "rgb(0, 230, 248)",
  "rgb(0, 233, 245)",
  "rgb(0, 236, 243)",
  "rgb(44, 239, 241)",
  "rgb(66, 242, 239)",
  "rgb(83, 245, 237)",
  "rgb(97, 247, 235)",
  "rgb(110, 250, 233)",  


  "rgb(110, 250, 233)", // blue to gray
  "rgb(116, 249, 233)",
  "rgb(121, 249, 233)",
  "rgb(126, 248, 233)",
  "rgb(131, 248, 232)",
  "rgb(136, 247, 232)",
  "rgb(141, 247, 232)",
  "rgb(145, 246, 232)",
  "rgb(149, 245, 232)",
  "rgb(153, 245, 232)",
  "rgb(157, 244, 232)",
  "rgb(161, 244, 232)",
  "rgb(165, 243, 231)",
  "rgb(169, 242, 231)",
  "rgb(173, 242, 231)",
  "rgb(176, 241, 231)",
  "rgb(180, 240, 231)",
  "rgb(183, 240, 231)",
  "rgb(186, 239, 231)",
  "rgb(190, 238, 231)",
  "rgb(193, 238, 230)",
  "rgb(196, 237, 230)",
  "rgb(199, 236, 230)",
  "rgb(203, 236, 230)",
  "rgb(206, 235, 230)",
  "rgb(209, 234, 230)",
  "rgb(212, 233, 230)",
  "rgb(215, 233, 230)",
  "rgb(218, 232, 229)",
  "rgb(221, 231, 229)",
  "rgb(223, 231, 229)",
  "rgb(226, 230, 229)",
  "rgb(229, 229, 229)",


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