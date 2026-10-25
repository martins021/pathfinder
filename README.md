# Pathfinder

A small pathfinding visualizer made with React and Next.js. Supports BFS, DFS and Dijkstra.

Place the start and target, draw some walls and press play. With Dijkstra you can also paint terrain to make some routes more expensive. There are controls for brush size, node size, playback speed and skipping through the animation.

Space pauses or resumes playback. Editing the grid stops the animation. Resizing the window resets the map.

## Run locally

```bash
npm ci
npm run dev
```

Open http://localhost:3000. Use Node.js 22 or newer.

For a production build, run `npm run build` followed by `npm start`.
