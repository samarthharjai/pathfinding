import { GridType, TileType } from "../../../utils/types";
import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors";
import { isEqual } from "../../../utils/helpers";

export const bellmanFord = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType
) => {
  const rows = grid.length;
  const cols = grid[0].length;

  const distance: number[][] = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const parent: (TileType | null)[][] = Array.from({ length: rows }, () => Array(cols).fill(null));
  
  distance[startTile.row][startTile.col] = 0;

  // Relax edges repeatedly
  for (let k = 0; k < rows * cols - 1; k++) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const currentTile = grid[i][j];
        if (currentTile.isWall) continue;
        
        const neighbors = getUntraversedNeighbors(grid, currentTile);
        for (const neighbor of neighbors) {
          const newDist = distance[currentTile.row][currentTile.col] + 1; // Assuming uniform weight
          if (newDist < distance[neighbor.row][neighbor.col]) {
            distance[neighbor.row][neighbor.col] = newDist;
            parent[neighbor.row][neighbor.col] = currentTile;
          }
        }
      }
    }
  }

  // Check for negative weight cycles
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const currentTile = grid[i][j];
      if (currentTile.isWall) continue;

      const neighbors = getUntraversedNeighbors(grid, currentTile);
      for (const neighbor of neighbors) {
        if (distance[currentTile.row][currentTile.col] + 1 < distance[neighbor.row][neighbor.col]) {
          throw new Error("Graph contains a negative weight cycle");
        }
      }
    }
  }

  const traversedTiles: TileType[] = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (distance[i][j] !== Infinity) {
        traversedTiles.push(grid[i][j]);
      }
    }
  }

  const path: TileType[] = [];
  let current: TileType | null = grid[endTile.row][endTile.col];
  while (current !== null) {
    path.unshift(current);
    current = parent[current.row][current.col];
  }

  if (!isEqual(path[0], startTile)) {
    throw new Error("No path found");
  }

  return { traversedTiles, path };
};
