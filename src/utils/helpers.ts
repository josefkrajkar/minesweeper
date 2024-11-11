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

export function calculateNeighborMineCounts(grid: Grid): Grid {
  const rows = grid.length;
  const cols = grid[0].length;

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    /* cell */ [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[x][y].isMine) continue;

      let count = 0;

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (
          nx >= 0 &&
          nx < rows &&
          ny >= 0 &&
          ny < cols &&
          grid[nx][ny].isMine
        ) {
          count++;
        }
      }

      grid[x][y].neighborMineCount = count;
    }
  }

  return grid;
}

export function revealNeighbors(grid: Grid, x: number, y: number): Grid {
  const rows = grid.length;
  const cols = grid[0].length;

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    /* cell */ [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const queue = [[x, y]];

  while (queue.length > 0) {
    const [x, y] = queue.shift()!;

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 &&
        nx < rows &&
        ny >= 0 &&
        ny < cols &&
        !grid[nx][ny].isRevealed &&
        !grid[nx][ny].isMine
      ) {
        grid[nx][ny].isRevealed = true;

        if (grid[nx][ny].neighborMineCount === 0) {
          queue.push([nx, ny]);
        }
      }
    }
  }

  return grid;
}

export function revealAllMines(grid: Grid): Grid {
  return grid.map((row) =>
    row.map((cell) => ({
      ...cell,
      isRevealed: cell.isMine || cell.isRevealed || cell.isFlagged,
    })),
  );
}

export function checkWinConditions(grid: Grid): boolean {
  return grid.every((row) =>
    row.every(
      (cell) =>
        (cell.isMine && cell.isFlagged) || (!cell.isMine && cell.isRevealed),
    ),
  );
}
