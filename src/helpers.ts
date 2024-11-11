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
