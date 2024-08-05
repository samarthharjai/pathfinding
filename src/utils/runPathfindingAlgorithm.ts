import { bellmanFord } from "../lib/algorithm/pathfinding/BellmanFord";
import { greedyBestFirstSearch } from "../lib/algorithm/pathfinding/GreedyBestFirstSearch";
import { aStar } from "../lib/algorithm/pathfinding/aStar";
import { bfs } from "../lib/algorithm/pathfinding/bfs";
import { dfs } from "../lib/algorithm/pathfinding/dfs";
import { dijkstra } from "../lib/algorithm/pathfinding/dijkstra";
import { AlgorithmType, GridType, TileType } from "./types";

export const runPathfindingAlgorithm = ({
  algorithm,
  grid,
  startTile,
  endTile,
}: {
  algorithm: AlgorithmType;
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
}) => {
  switch (algorithm) {
    case "BFS":
      return bfs(grid, startTile, endTile);
    case "DFS":
      return dfs(grid, startTile, endTile);
    case "DIJKSTRA":
      return dijkstra(grid, startTile, endTile);
    case "A_STAR":
      return aStar(grid, startTile, endTile);
    case "Greedy Best-First":
      return greedyBestFirstSearch(grid, startTile, endTile)
    case "Bellman-Ford":
      return bellmanFord(grid, startTile, endTile)
    default:
      return bfs(grid, startTile, endTile);
  }
};