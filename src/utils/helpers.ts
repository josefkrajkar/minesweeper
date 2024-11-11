// Types
import type { Cell, Grid } from "./types";

export function createEmptyGrid(rows: number, cols: number): Grid {
  const grid: Grid = [];

  for (let x = 0; x < rows; x++) {
    const row: Cell[] = [];
    for (let y = 0; y < cols; y++) {
      row.push({
        x,
        y,
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMineCount: 0,
      });
    }
    grid.push(row);
  }

  return grid;
}

export function placeMines(grid: Grid, mineCount: number): Grid {
  const rows = grid.length;
  const cols = grid[0].length;
  const totalCells = rows * cols;

  // Create an array of cell indices
  const indices = Array.from({ length: totalCells }, (_, i) => i);

  // Shuffle the indices
  for (let i = totalCells - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Place mines
  for (let i = 0; i < mineCount; i++) {
    const idx = indices[i];
    const x = Math.floor(idx / cols);
    const y = idx % cols;
    grid[x][y].isMine = true;
  }

  return grid;
}
